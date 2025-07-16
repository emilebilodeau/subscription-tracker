"use client";

import { useState } from "react";
import { Subscription } from "@/types/subscription";
import SubscriptionForm from "@/components/subscriptions/SubscriptionForm";
import SubscriptionList from "@/components/subscriptions/SubscriptionList";

// NOTE: this page could probably be refactored to reduce prop drilling
export default function Page() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const handleAdd = (data: Omit<Subscription, "id">) => {
    const newSub = { ...data, id: Date.now() };
    setSubscriptions((prev) => [...prev, newSub]);
  };

  const handleEdit = (updated: Subscription) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === updated.id ? updated : sub))
    );
  };

  const handleDelete = (id: number) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="border border-gray-300 rounded-xl p-10 shadow-sm bg-white w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add Subscription
        </h2>
        <SubscriptionForm onAdd={handleAdd} />

        {subscriptions.length > 0 && (
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
