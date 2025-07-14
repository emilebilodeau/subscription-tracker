export type Category = "Entertainment" | "Productivity" | "Utilities" | "Other";
export type BillingCycle = "Monthly" | "Yearly";

export interface Subscription {
  id: number;
  name: string;
  price: number;
  category: Category;
  billingCycle: BillingCycle;
  nextBillDate: string;
}
