// src/routes/subscriptions.ts
import { Router, Request, Response } from "express";
import { pool } from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

const router = Router();

// Matches MySQL table structure
export interface SubscriptionRow extends RowDataPacket {
  id: number;
  name: string;
  price: number;
  category: "Entertainment" | "Productivity" | "Utilities" | "Other";
  billing_cycle: "Monthly" | "Yearly";
  next_bill_date: string; // MySQL DATE as 'YYYY-MM-DD'
  created_at: string; // TIMESTAMP as string
  updated_at: string; // TIMESTAMP as string
}

// Body for create / update -> matches frontend structure
export interface SubscriptionBody {
  name: string;
  price: number;
  category: SubscriptionRow["category"];
  billingCycle: SubscriptionRow["billing_cycle"];
  nextBillDate: string; // 'YYYY-MM-DD'
}

/**
 * GET /api/subscriptions
 * List all subscriptions
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<SubscriptionRow[]>(
      "SELECT * FROM subscriptions ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching subscriptions:", err);
    res.status(500).json({ message: "Failed to fetch subscriptions" });
  }
});

/**
 * POST /api/subscriptions
 * Create subscription
 */
router.post("/", async (req: Request, res: Response) => {
  const { name, price, category, billingCycle, nextBillDate } =
    req.body as SubscriptionBody;

  if (!name || price == null || !category || !billingCycle || !nextBillDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `
      INSERT INTO subscriptions 
        (name, price, category, billing_cycle, next_bill_date)
      VALUES (?, ?, ?, ?, ?)
      `,
      [name, price, category, billingCycle, nextBillDate] // map to snake_case cols
    );

    const insertedId = result.insertId;

    const [rows] = await pool.query<SubscriptionRow[]>(
      "SELECT * FROM subscriptions WHERE id = ?",
      [insertedId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Error creating subscription:", err);
    res.status(500).json({ message: "Failed to create subscription" });
  }
});

/**
 * PUT /api/subscriptions/:id
 * Update subscription (full update)
 */
router.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const { name, price, category, billingCycle, nextBillDate } =
    req.body as SubscriptionBody;

  if (!name || price == null || !category || !billingCycle || !nextBillDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `
      UPDATE subscriptions
      SET name = ?, price = ?, category = ?, billing_cycle = ?, next_bill_date = ?
      WHERE id = ?
      `,
      [name, price, category, billingCycle, nextBillDate, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const [rows] = await pool.query<SubscriptionRow[]>(
      "SELECT * FROM subscriptions WHERE id = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Error updating subscription:", err);
    res.status(500).json({ message: "Failed to update subscription" });
  }
});
/**
 * DELETE /api/subscriptions/:id
 * Delete subscription
 */
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    const [result] = await pool.query<ResultSetHeader>( // ⬅️ typed as ResultSetHeader
      "DELETE FROM subscriptions WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting subscription:", err);
    res.status(500).json({ message: "Failed to delete subscription" });
  }
});

export default router;
