import { Request, Response } from "express";
import db from "../db";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    db.query("SELECT * FROM MsCustomer", (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        return res.status(500).json({
          status: "error",
          message: "An error occurred while fetching customers.",
          data: null,
        });
      }

      res.status(200).json({
        status: "success",
        message: "Customers retrieved successfully.",
        data: results,
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred.",
      data: null,
    });
  }
};

export const addcustomer = async (req: Request, res: Response) => {
  const { name, phone, address } = req.body;

  if (!name || !phone || !address === undefined) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields: name, phone, and address.",
      data: null,
    });
  }

  try {
    db.query(
      "INSERT INTO MsCustomer (name, phone, address) VALUES (?, ?, ?)",
      [name, phone, address],
      (err, results) => {
        if (err) {
          console.error("Error inserting into the database:", err);
          return res.status(500).json({
            status: "error",
            message: "An error occurred while inserting customer.",
            data: null,
          });
        }

        res.status(201).json({
          status: "success",
          message: "Customer added successfully.",
          data: {
            name,
            phone,
            address,
          },
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
