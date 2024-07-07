import { Request, Response } from "express";
import moment from "moment";
import db from "../db";

type GenerateCounterResult = {
  new_counter: number;
};

const generateCounter = async (
  year: number,
  month: number
): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    db.query(
      "SELECT IFNULL(MAX(counter), 0) + 1 AS new_counter FROM Counter WHERE year = ? AND month = ?",
      [year, month],
      (err, results) => {
        if (err) {
          return reject(err);
        }

        const result = results as GenerateCounterResult[];

        if (result.length > 0) {
          const newCounter = result[0].new_counter;
          resolve(newCounter);
        } else {
          reject(new Error("Unexpected result format"));
        }
      }
    );
  });
};

export const createCounter = async (req: Request, res: Response) => {
  const { tanggal_transaksi } = req.params;

  const date = moment(tanggal_transaksi, "YYYY-MM-DD");
  const year = date.year();
  const month = date.month() + 1;

  try {
    const counter = await generateCounter(year, month);

    db.query(
      "INSERT INTO Counter (year, month, counter) VALUES (?, ?, ?)",
      [year, month, counter],
      (err) => {
        if (err) {
          console.error("Error inserting into the database:", err);
          return res.status(500).json({
            status: "error",
            message: "An error occurred while creating the counter.",
            data: null,
          });
        }

        const counterString = `SO/${year}/${date.date()}/${month}/${counter}`;

        res.status(200).json({
          status: "success",
          message: "Counter created successfully.",
          data: { counter: counterString },
        });
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred.",
      data: null,
    });
  }
};
