"use client";

import { useState } from "react";
import { Subscription } from "@/types/subscription";
import SubscriptionEdit from "./subscriptionItem/SubscriptionEdit";
import SubscriptionView from "./subscriptionItem/SubscriptionView";

interface Props {
  subscriptions: Subscription[];
  onEdit: (sub: Subscription) => void;
  onDelete: (id: number) => void;
}

// NOTE: currently a lot is managed in SubscriptionList. Some improvements for...
// ... maintainability could be implemented. keeping it like this for simplicity
export default function SubscriptionList({
  subscriptions,
  onEdit,
  onDelete,
}: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Subscription>>({});

  const monthlyTotal = subscriptions.reduce((total, sub) => {
    return (
      total + (sub.billingCycle === "Monthly" ? sub.price : sub.price / 12)
    );
  }, 0);

  const yearlyTotal = subscriptions.reduce((total, sub) => {
    return total + (sub.billingCycle === "Yearly" ? sub.price : sub.price * 12);
  }, 0);

  const startEdit = (sub: Subscription) => {
    setEditingId(sub.id);
    setEditForm({ ...sub });
  };

  const saveEdit = () => {
    if (
      !editForm.name ||
      !editForm.price ||
      !editForm.category ||
      !editForm.billingCycle ||
      !editForm.nextBillDate
    ) {
      alert("All fields are required.");
      return;
    }

    onEdit(editForm as Subscription);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  // check if the subs next bill date is within 7 days of current date
  function isDueSoon(dateStr: string): boolean {
    const today = new Date();
    const dueDate = new Date(dateStr);

    // reset time for accurate comparison
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffInMs = dueDate.getTime() - today.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays >= 0 && diffInDays <= 7;
  }

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Your Subscriptions
      </h3>

      <div className="mb-6 text-center">
        <p className="text-gray-800 font-medium">
          Estimated Monthly Spend:{" "}
          <span className="text-blue-600">${monthlyTotal.toFixed(2)}</span>
        </p>
        <p className="text-gray-800 font-medium">
          Estimated Yearly Spend:{" "}
          <span className="text-blue-600">${yearlyTotal.toFixed(2)}</span>
        </p>
      </div>

      <ul className="space-y-3">
        {subscriptions.map((sub) => (
          <li
            key={sub.id}
            className={`border rounded p-4 ${
              isDueSoon(sub.nextBillDate)
                ? "border-yellow-400 bg-yellow-50"
                : "border-gray-200"
            }`}
          >
            {editingId === sub.id ? (
              <SubscriptionEdit
                editForm={editForm}
                setEditForm={setEditForm}
                onSave={saveEdit}
                onCancel={cancelEdit}
              />
            ) : (
              <SubscriptionView
                sub={sub}
                startEdit={startEdit}
                onDelete={onDelete}
                isDueSoon={isDueSoon}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
