export interface Subscription {
  id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  nextBillingDate: string;
}
