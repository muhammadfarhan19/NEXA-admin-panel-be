import { Request, Response } from "express";
import db from "../db";

export const getTransactionDetail = async (req: Request, res: Response) => {
  try {
    db.query("SELECT * FROM TransaksiD WHERE ", (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        return res.status(500).json({
          status: "error",
          message: "An error occurred while fetching detail transaction list.",
          data: null,
        });
      }

      res.status(200).json({
        status: "success",
        message: "Transaction list retrieved successfully.",
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

export const addTransactionDetail = async (req: Request, res: Response) => {
  const { id_transaksi_h, nama_barang, kd_barang, qty, subtotal, price } = req.body;

  if (
    !kd_barang ||
    !nama_barang ||
    !id_transaksi_h ||
    !qty ||
    price ||
    !subtotal === undefined
  ) {
    return res.status(400).json({
      status: "error",
      message:
        "Missing required fields: id_transaksi_h, nama_barang, kd_barang, qty, subtotal, price.",
      data: null,
    });
  }

  try {
    // Insert data into the barang table
    db.query(
      "INSERT INTO TransaksiD (id_transaksi_h, nama_barang, kd_barang, qty, subtotal, price) VALUES (?, ?, ?)",
      [id_transaksi_h, nama_barang, kd_barang, qty, subtotal],
      (err, results) => {
        if (err) {
          console.error("Error inserting into the database:", err);
          return res.status(500).json({
            status: "error",
            message: "An error occurred while inserting barang.",
            data: null,
          });
        }

        res.status(201).json({
          status: "success",
          message: "Barang added successfully.",
          data: {
            id_transaksi_h, nama_barang, kd_barang, qty, subtotal
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

export const deleteBarang = async (req: Request, res: Response) => {
  const { kd_barang } = req.params;

  try {
    db.query(
      "DELETE FROM barang WHERE kd_barang = ?",
      [kd_barang],
      (err, results) => {
        if (err) {
          console.error("Error deleting from the database:", err);
          return res.status(500).json({
            status: "error",
            message: "An error occurred while deleting barang.",
            data: null,
          });
        }

        const { affectedRows } = results as { affectedRows: number };

        if (affectedRows === 0) {
          return res.status(404).json({
            status: "error",
            message: "Barang not found.",
            data: null,
          });
        }

        res.status(200).json({
          status: "success",
          message: "Barang deleted successfully.",
          data: null,
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

export const updateBarang = async (req: Request, res: Response) => {
  const { kd_barang } = req.params;
  const { nama_barang, price } = req.body;

  // Validate input
  if (!nama_barang || price === undefined) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields: nama_barang or price.",
      data: null,
    });
  }

  try {
    db.query(
      "UPDATE barang SET nama_barang = ?, price = ? WHERE kd_barang = ?",
      [nama_barang, price, kd_barang],
      (err, results) => {
        if (err) {
          console.error("Error updating the database:", err);
          return res.status(500).json({
            status: "error",
            message: "An error occurred while updating barang.",
            data: null,
          });
        }

        // results is usually an array where the first element is the metadata
        const { affectedRows } = results as { affectedRows: number };

        if (affectedRows === 0) {
          return res.status(404).json({
            status: "error",
            message: "Barang not found.",
            data: null,
          });
        }

        res.status(200).json({
          status: "success",
          message: "Barang updated successfully.",
          data: {
            kd_barang,
            nama_barang,
            price,
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
