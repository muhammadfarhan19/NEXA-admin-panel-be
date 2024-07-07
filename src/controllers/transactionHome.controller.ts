import { Request, Response } from "express";
import db from "../db"; // Adjust this import according to your file structure
import { ResultSetHeader } from "mysql2";
import { dateConverter } from "../utils/common";

// Create a new TransaksiH
export const createTransaksiHome = async (req: Request, res: Response) => {
  const { customer_id, nomor_transaksi, tanggal_transaksi, total_transaksi } =
    req.body;

  try {
    const result = await db.query<ResultSetHeader>(
      "INSERT INTO TransaksiH (customer_id, nomor_transaksi, tanggal_transaksi, total_transaksi) VALUES (?, ?)",
      [customer_id, nomor_transaksi, tanggal_transaksi, total_transaksi]
    );

    const transaksiHId = result;
    res.status(201).json({
      status: "success",
      message: "TransaksiH created successfully.",
      id: transaksiHId,
    });
  } catch (error) {
    console.error("Error creating TransaksiH:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating TransaksiH.",
    });
  }
};

// // Get all TransaksiH records

export const getAllTransaksiH = async (req: Request, res: Response) => {
  try {
    const [results]: [any[], any] = await db
      .promise()
      .query("SELECT * FROM TransaksiH");

    // Convert tanggal_transaksi for each result
    const formattedResults = results.map((result) => ({
      ...result,
      tanggal_transaksi: dateConverter(result.tanggal_transaksi),
    }));

    res.status(200).json({
      status: "success",
      message: "TransaksiH retrieved successfully.",
      data: formattedResults,
    });
  } catch (error) {
    console.error("Error fetching TransaksiH:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching TransaksiH.",
      data: null,
    });
  }
};

// // Get a single TransaksiH by ID
// export const getTransaksiHById = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const [results] = await db.query("SELECT * FROM TransaksiH WHERE id = ?", [
//       id,
//     ]);
//     if ((results as any).length === 0) {
//       return res.status(404).json({
//         status: "error",
//         message: "TransaksiH not found.",
//         data: null,
//       });
//     }
//     res.status(200).json({
//       status: "success",
//       message: "TransaksiH retrieved successfully.",
//       data: (results as any)[0],
//     });
//   } catch (error) {
//     console.error("Error fetching TransaksiH:", error);
//     res.status(500).json({
//       status: "error",
//       message: "An error occurred while fetching TransaksiH.",
//       data: null,
//     });
//   }
// };

// // Update a TransaksiH by ID
// export const updateTransaksiH = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { date, customer_id } = req.body;

//   try {
//     const [result] = await db.query<ResultSetHeader>(
//       "UPDATE TransaksiH SET tanggal_transaksi = ?, id_customer = ? WHERE id = ?",
//       [date, customer_id, id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         status: "error",
//         message: "TransaksiH not found.",
//         data: null,
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       message: "TransaksiH updated successfully.",
//     });
//   } catch (error) {
//     console.error("Error updating TransaksiH:", error);
//     res.status(500).json({
//       status: "error",
//       message: "An error occurred while updating TransaksiH.",
//     });
//   }
// };

// // Delete a TransaksiH by ID
// export const deleteTransaksiH = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const [result] = await db.query<ResultSetHeader>(
//       "DELETE FROM TransaksiH WHERE id = ?",
//       [id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         status: "error",
//         message: "TransaksiH not found.",
//         data: null,
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       message: "TransaksiH deleted successfully.",
//     });
//   } catch (error) {
//     console.error("Error deleting TransaksiH:", error);
//     res.status(500).json({
//       status: "error",
//       message: "An error occurred while deleting TransaksiH.",
//     });
//   }
// };

// // Add TransaksiD to a TransaksiH
// export const addTransaksiD = async (req: Request, res: Response) => {
//   const { transaksiHId, kd_barang, qty, subtotal } = req.body;

//   try {
//     const [result] = await db.query<ResultSetHeader>(
//       "INSERT INTO TransaksiD (id_transaksi_h, kd_barang, qty, subtotal) VALUES (?, ?, ?, ?)",
//       [transaksiHId, kd_barang, qty, subtotal]
//     );

//     res.status(201).json({
//       id: result.insertId,
//       message: "TransaksiD added successfully.",
//     });
//   } catch (error) {
//     console.error("Error adding TransaksiD:", error);
//     res.status(500).json({
//       error: "An error occurred while adding TransaksiD.",
//     });
//   }
// };

// // Get all TransaksiD for a TransaksiH
// export const getTransaksiDByTransaksiHId = async (
//   req: Request,
//   res: Response
// ) => {
//   const { transaksiHId } = req.params;

//   try {
//     const [results] = await db.query(
//       "SELECT * FROM TransaksiD WHERE id_transaksi_h = ?",
//       [transaksiHId]
//     );
//     res.status(200).json({
//       status: "success",
//       message: "TransaksiD retrieved successfully.",
//       data: results,
//     });
//   } catch (error) {
//     console.error("Error fetching TransaksiD:", error);
//     res.status(500).json({
//       status: "error",
//       message: "An error occurred while fetching TransaksiD.",
//       data: null,
//     });
//   }
// };
