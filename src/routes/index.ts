import { Router } from "express";
import { addcustomer, getCustomers } from "../controllers/customer.controller";
import {
  addBarang,
  deleteBarang,
  getBarang,
  updateBarang,
} from "../controllers/barang.controller";
import { createCounter } from "../controllers/counter.controller";
import { addTransactionDetail, getTransactionDetail } from "../controllers/transactionDetail.controller";
import {
  createTransaksiHome,
  getAllTransaksiH,
} from "../controllers/transactionHome.controller";

const router = Router();

router.get("/customers", getCustomers);
router.post("/insert/customers", addcustomer);

router.get("/barang", getBarang);
router.post("/insert/barang", addBarang);
router.delete("/delete/barang/:kd_barang", deleteBarang);
router.delete("/update/barang/:kd_barang", updateBarang);

router.get("/counter/:tanggal_transaksi", createCounter);

router.get("/home-transaction", getAllTransaksiH);
router.post("/insert/home-transaction", createTransaksiHome);

router.get("/detail-transaction", getTransactionDetail);
router.post('/insert/detail-transaction', addTransactionDetail)

export default router;
