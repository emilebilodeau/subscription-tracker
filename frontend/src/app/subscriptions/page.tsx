"use client";

import { useState } from "react";
import { Subscription } from "@/types/subscription";
import SubscriptionForm from "@/components/subscriptions/SubscriptionForm";
import SubscriptionList from "@/components/subscriptions/SubscriptionList";

export default function Page() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const handleAdd = (data: Omit<Subscription, "id">) => {
    // NOTE: id is just a timestamp for now, subject to change later
    const newSub = { ...data, id: Date.now() };
    setSubscriptions((prev) => [...prev, newSub]);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="border border-gray-300 rounded-xl p-10 shadow-sm bg-white w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add Subscription
        </h2>
        <SubscriptionForm onAdd={handleAdd} />
        {subscriptions.length > 0 && (
          <SubscriptionList subscriptions={subscriptions} />
        )}
      </div>
    </main>
  );
}
