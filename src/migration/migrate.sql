CREATE TABLE `MsCustomer` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL
);

-- Create the `TransaksiH` table, which references `MsCustomer`
CREATE TABLE `TransaksiH` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `id_customer` INT NOT NULL,
  `nomor_transaksi` VARCHAR(255) NOT NULL,
  `tanggal_transaksi` DATETIME NOT NULL,
  `total_transaksi` FLOAT NOT NULL,
  FOREIGN KEY (`id_customer`) REFERENCES `MsCustomer`(`id`)
);

-- Create the `TransaksiD` table, which references `TransaksiH`
CREATE TABLE `TransaksiD` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `id_transaksi_h` INT NOT NULL,
  `kd_barang` VARCHAR(255) NOT NULL,
  `nama_barang` VARCHAR(255) NOT NULL,
  `qty` INT NOT NULL,
  `subtotal` FLOAT NOT NULL,
  FOREIGN KEY (`id_transaksi_h`) REFERENCES `TransaksiH`(`id`)
);

-- Create the `Counter` table (it doesn't reference any other tables)
CREATE TABLE `Counter` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `month` INT NOT NULL,
  `year` INT NOT NULL,
  `counter` INT NOT NULL
);
CREATE TABLE `barang` (
    `kd_barang` VARCHAR(10) PRIMARY KEY,
    `nama_barang` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 0)
);