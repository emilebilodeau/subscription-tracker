"use client";

import { useForm } from "react-hook-form";
import { Subscription } from "@/types/subscription";

interface Props {
  onAdd: (data: Omit<Subscription, "id">) => void;
}

const categories = ["Entertainment", "Productivity", "Utilities", "Other"];
const billingCycles = ["Monthly", "Yearly"];

export default function SubscriptionForm({ onAdd }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Subscription, "id">>();

  // NOTE: API call will be included here once backend implemented
  const onSubmit = (data: Omit<Subscription, "id">) => {
    onAdd(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Subscription Name"
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            min: { value: 0.01, message: "Price must be positive" },
            valueAsNumber: true,
          })}
          placeholder="Monthly Price (e.g., 9.99)"
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full border border-gray-300 rounded px-4 py-2"
          defaultValue=""
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
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Billing Cycle */}
      <div>
        <select
          {...register("billingCycle", {
            required: "Billing cycle is required",
          })}
          className="w-full border border-gray-300 rounded px-4 py-2"
          defaultValue=""
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
        {errors.billingCycle && (
          <p className="text-red-500 text-sm">{errors.billingCycle.message}</p>
        )}
      </div>

      {/* Next Bill Date */}
      <div>
        <input
          type="date"
          {...register("nextBillDate", {
            required: "Next billing date is required",
          })}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        {errors.nextBillDate && (
          <p className="text-red-500 text-sm">{errors.nextBillDate.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Add Subscription
      </button>
    </form>
  );
}
