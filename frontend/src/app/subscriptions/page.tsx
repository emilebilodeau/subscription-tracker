"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Subscription } from "@/types/subscription";
import SubscriptionForm from "@/components/subscriptions/SubscriptionForm";
import SubscriptionList from "@/components/subscriptions/SubscriptionList";

// TODO: change this to environment variable
const API_BASE = "http://localhost:8800/api";

// TODO: change this logic to be handled by the backend, simplify frontend
type ApiSubscription = {
  id: number;
  name: string;
  price: string; // from MySQL DECIMAL
  category: Subscription["category"];
  billing_cycle: Subscription["billingCycle"];
  next_bill_date: string;
  created_at: string;
  updated_at: string;
};

function fromApi(sub: ApiSubscription): Subscription {
  return {
    id: sub.id,
    name: sub.name,
    // ensure we always convert price to a number
    price: Number(sub.price),
    category: sub.category,
    billingCycle: sub.billing_cycle,
    nextBillDate: sub.next_bill_date,
    // createdAt: sub.created_at,
    // updatedAt: sub.updated_at,
  };
}

function toApi(body: Omit<Subscription, "id"> | Subscription) {
  return {
    name: body.name,
    price: body.price,
    category: body.category,
    billingCycle: body.billingCycle,
    nextBillDate: body.nextBillDate,
  };
}

export default function Page() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  // GET list all subscriptions
  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get<ApiSubscription[]>(
          `${API_BASE}/subscriptions`
        );
        setSubscriptions(res.data.map(fromApi));
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // POST create a new subscription
  const handleAdd = async (data: Omit<Subscription, "id">) => {
    try {
      const res = await axios.post<ApiSubscription>(
        `${API_BASE}/subscriptions`,
        toApi(data)
      );
      setSubscriptions((prev) => [...prev, fromApi(res.data)]);
    } catch (err) {
      console.error("Failed to create subscription:", err);
    }
  };

  // PUT edit an existing subscription
  const handleEdit = async (updated: Subscription) => {
    try {
      const res = await axios.put<ApiSubscription>(
        `${API_BASE}/subscriptions/${updated.id}`,
        toApi(updated)
      );
      const mapped = fromApi(res.data);
      setSubscriptions((prev) =>
        prev.map((s) => (s.id === updated.id ? mapped : s))
      );
    } catch (err) {
      console.error("Failed to update subscription:", err);
    }
  };

  // DELETE an existing subscription
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/subscriptions/${id}`);
      setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Failed to delete subscription:", err);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="border border-gray-300 rounded-xl p-10 shadow-sm bg-white w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add Subscription
        </h2>

        <SubscriptionForm onAdd={handleAdd} />

        {loading && <p className="mt-4 text-center">Loading...</p>}

        {!loading && subscriptions.length > 0 && (
          <SubscriptionList
            subscriptions={subscriptions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
}
