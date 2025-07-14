"use client";

import { useState } from "react";
import { Subscription } from "@/types/subscription";
import type { Category, BillingCycle } from "@/types/subscription";

interface Props {
  subscriptions: Subscription[];
  onEdit: (sub: Subscription) => void;
  onDelete: (id: number) => void;
}

// NOTE: in a further update, reuse the SubscriptionForm.tsx component...
// ... instead of the additional code used for a quick inline edit
export default function SubscriptionList({
  subscriptions,
  onEdit,
  onDelete,
}: Props) {
  const categories: Category[] = [
    "Entertainment",
    "Productivity",
    "Utilities",
    "Other",
  ];
  const billingCycles: BillingCycle[] = ["Monthly", "Yearly"];

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Subscription>>({});

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

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Your Subscriptions
      </h3>
      <ul className="space-y-3">
        {subscriptions.map((sub) => (
          <li key={sub.id} className="border border-gray-200 rounded p-4">
            {editingId === sub.id ? (
              <>
                <input
                  className="mb-2 w-full border rounded px-2 py-1"
                  value={editForm.name || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
                <input
                  type="number"
                  step="0.01"
                  className="mb-2 w-full border rounded px-2 py-1"
                  value={editForm.price?.toString() || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
                <select
                  className="mb-2 w-full border rounded px-2 py-1"
                  value={editForm.category || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      category: e.target.value as Category,
                    })
                  }
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <select
                  className="mb-2 w-full border rounded px-2 py-1"
                  value={editForm.billingCycle || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      billingCycle: e.target.value as BillingCycle,
                    })
                  }
                >
                  <option value="" disabled>
                    Select Billing Cycle
                  </option>
                  {billingCycles.map((cycle) => (
                    <option key={cycle} value={cycle}>
                      {cycle}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  className="mb-2 w-full border rounded px-2 py-1"
                  value={editForm.nextBillDate || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, nextBillDate: e.target.value })
                  }
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={saveEdit}
                    className="text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-white bg-gray-400 px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="font-medium">{sub.name}</div>
                <div className="text-sm text-gray-600">
                  ${sub.price.toFixed(2)} • {sub.category} • {sub.billingCycle}{" "}
                  • Due {sub.nextBillDate}
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => startEdit(sub)}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(sub.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
