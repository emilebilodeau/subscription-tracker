export interface Subscription {
  id: number;
  name: string;
  price: number;
  category: string;
  billingCycle: "monthly" | "yearly";
  nextBillDate: string;
}
