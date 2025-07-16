"use client";

import { Subscription } from "@/types/subscription";
import type { Category, BillingCycle } from "@/types/subscription";

interface Props {
  // edit form is to prefill the edit
  editForm: Partial<Subscription>;
  // setEditForm is to update to the "new subscription" using edit inputs
  setEditForm: React.Dispatch<React.SetStateAction<Partial<Subscription>>>;
  onSave: () => void;
  onCancel: () => void;
}

const categories: Category[] = [
  "Entertainment",
  "Productivity",
  "Utilities",
  "Other",
];

const billingCycles: BillingCycle[] = ["Monthly", "Yearly"];

// TODO: in a further update, reuse the SubscriptionForm.tsx component...
// ... instead of the additional code used for a quick inline edit
export default function SubscriptionEdit({
  editForm,
  setEditForm,
  onSave,
  onCancel,
}: Props) {
  return (
    <>
      <input
        className="mb-2 w-full border rounded px-2 py-1"
        value={editForm.name || ""}
        onChange={(e) =>
          setEditForm((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      <input
        type="number"
        step="0.01"
        className="mb-2 w-full border rounded px-2 py-1"
        value={editForm.price?.toString() || ""}
        onChange={(e) =>
          setEditForm((prev) => ({
            ...prev,
            price: parseFloat(e.target.value),
          }))
        }
      />

      <select
        className="mb-2 w-full border rounded px-2 py-1"
        value={editForm.category || ""}
        onChange={(e) =>
          setEditForm((prev) => ({
            ...prev,
            category: e.target.value as Category,
          }))
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
          setEditForm((prev) => ({
            ...prev,
            billingCycle: e.target.value as BillingCycle,
          }))
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
          setEditForm((prev) => ({ ...prev, nextBillDate: e.target.value }))
        }
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={onSave}
          className="text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="text-white bg-gray-400 px-3 py-1 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
