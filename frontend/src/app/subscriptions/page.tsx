"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

// TODO: import from types later
interface Subscription {
  id: number;
  name: string;
  price: number;
  category: string;
  billingCycle: string;
  nextBillDate: string;
}

const categories = ["Entertainment", "Productivity", "Utilities", "Other"];
const billingCycles = ["Monthly", "Yearly"];

export default function Page() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Subscription>();

  const onSubmit = (data: Omit<Subscription, "id">) => {
    const newSubscription: Subscription = {
      ...data,
      id: Date.now(),
    };
    setSubscriptions((prev) => [...prev, newSubscription]);
    reset();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="border border-gray-300 rounded-xl p-10 shadow-sm bg-white w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add Subscription
        </h2>

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
              <p className="text-red-500 text-sm">
                {errors.billingCycle.message}
              </p>
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
              <p className="text-red-500 text-sm">
                {errors.nextBillDate.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add Subscription
          </button>
        </form>

        {/* List */}
        {subscriptions.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Your Subscriptions
            </h3>
            <ul className="space-y-3">
              {subscriptions.map((sub) => (
                <li key={sub.id} className="border border-gray-200 rounded p-4">
                  <div className="font-medium">{sub.name}</div>
                  <div className="text-sm text-gray-600">
                    ${sub.price.toFixed(2)} • {sub.category} •{" "}
                    {sub.billingCycle} • Due {sub.nextBillDate}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
