import { Subscription } from "@/types/subscription";

interface Props {
  subscriptions: Subscription[];
}

export default function SubscriptionList({ subscriptions }: Props) {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Your Subscriptions
      </h3>
      <ul className="space-y-3">
        {subscriptions.map((sub) => (
          <li key={sub.id} className="border border-gray-200 rounded p-4">
            <div className="font-medium">{sub.name}</div>
            <div className="text-sm text-gray-600">
              ${sub.price.toFixed(2)} • {sub.category} • {sub.billingCycle} •
              Due {sub.nextBillDate}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
