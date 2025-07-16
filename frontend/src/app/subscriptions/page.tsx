"use client";

import { useState } from "react";
import { Subscription } from "@/types/subscription";
import SubscriptionForm from "@/components/subscriptions/SubscriptionForm";
import SubscriptionList from "@/components/subscriptions/SubscriptionList";

export default function Page() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const handleAdd = (data: Omit<Subscription, "id">) => {
    const newSub = { ...data, id: Date.now() };
    // functional form of state updating; ensure i'm working with the latest state
    // we create a new array here (using prev and newSub) and update the state
    // this means we are not modifying the old array, we're making a new one
    // performance implication if working with a big array??
    setSubscriptions((prev) => [...prev, newSub]);
  };

  // this replaces the "old" subscription with the new updated one, however...
  // ... i'm not 100% sure how the code works
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
        <SubscriptionForm onAdd={handleAdd} test="test string" />

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
