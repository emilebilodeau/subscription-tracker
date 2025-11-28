"use client";

import { Subscription } from "@/types/subscription";

interface Props {
  sub: Subscription;
  startEdit: (sub: Subscription) => void;
  onDelete: (id: number) => Promise<void> | void;
  isDueSoon: (dateStr: string) => boolean;
}

function formatDate(dateStr: string) {
  return dateStr.split("T")[0]; // keep only YYYY-MM-DD
}

export default function SubscriptionView({
  sub,
  startEdit,
  onDelete,
  isDueSoon,
}: Props) {
  return (
    <>
      <div className="font-medium">{sub.name}</div>

      <div className="text-sm text-gray-600">
        ${sub.price.toFixed(2)} • {sub.category} • {sub.billingCycle} • Due{" "}
        {formatDate(sub.nextBillDate)}
        {isDueSoon(sub.nextBillDate) && (
          <span className="text-yellow-600 font-medium ml-2">⚠️ Due Soon</span>
        )}
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
  );
}
