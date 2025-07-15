"use client";

import { useForm } from "react-hook-form";
import { Subscription } from "@/types/subscription";

interface Props {
  // onAdd is a function, the interface shows what the function expects...
  // ... and what it returns
  // Omit is special class, where you pass a type in this case and...
  // ... and exclude the "id" key
  onAdd: (data: Omit<Subscription, "id">) => void;
  // regular variable example
  test: string;
}

const categories = ["Entertainment", "Productivity", "Utilities", "Other"];
const billingCycles = ["Monthly", "Yearly"];

export default function SubscriptionForm({ onAdd, test }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Subscription, "id">>();

  console.log(test);

  // NOTE: API call will be included here once backend implemented
  const onSubmit = (data: Omit<Subscription, "id">) => {
    onAdd(data);
    reset();
  };

  return (
    // onSubmit "implicitely knows" what "data" is based on the registered...
    // ... inputs defined in the rest of the tsx, which is why the data object...
    // ... doesn't need to be passed to it. once validation is complete...
    // ... the handleSubmit function will call onSubmit, which itself calls onAdd
    // i believe handleSubmit is what essentially passes "data" to onSubmit
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <input
          // when registered an input, the first argument is essentially what the name...
          // ... of the key will be (in this case just "name"), and the second argument...
          // ... is the validation. so in your form, if all inputs are valid, this will...
          // ... show as { name : "whatever you wrote"}
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
          placeholder="Monthly Price (e.g., 9.99)"
          className="w-full border border-gray-300 rounded px-4 py-2"
          // doesn't seem to matter where in the input registration is done
          {...register("price", {
            required: "Price is required",
            min: { value: 0.01, message: "Price must be positive" },
            valueAsNumber: true,
          })}
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
