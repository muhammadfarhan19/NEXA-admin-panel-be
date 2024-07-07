import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "farhan",
  password: "farhan",
  database: "admin_panel",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);
});

export default db;
