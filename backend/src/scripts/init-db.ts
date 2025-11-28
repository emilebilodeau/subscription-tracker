import { pool } from "../config/db";

async function initDB() {
  const createSubscriptionsTableSQL = `
    CREATE TABLE IF NOT EXISTS subscriptions (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      category ENUM('Entertainment', 'Productivity', 'Utilities', 'Other') NOT NULL,
      billing_cycle ENUM('Monthly', 'Yearly') NOT NULL,
      next_bill_date DATE NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    );
  `;

  try {
    await pool.query(createSubscriptionsTableSQL);
    console.log("Subscriptions table created (or already exists).");
  } catch (err) {
    console.error("Error creating subscriptions table:", err);
    process.exitCode = 1;
  } finally {
    // close the pool so the script can exit cleanly
    await pool.end();
  }
}

initDB();
