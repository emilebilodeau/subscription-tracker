export interface Subscription {
  id: string;
  name: string;
  price: number;
  category: string;
  billingCycle: "monthly" | "yearly";
  nextBillingDate: string;
}
