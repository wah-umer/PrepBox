export type SubscriptionFrequency = "weekly" | "monthly";
export type SubscriptionStatus = "active" | "paused" | "cancelled" | "skipped";

export interface SubscriptionPlan {
  id: string;
  name: string;
  frequency: SubscriptionFrequency;
  description: string;
  discount: number; // Percentage discount
  price: number; // Base price per delivery
  savings: string; // Display text for savings
  popular?: boolean;
}

export interface SubscriptionItem {
  productId: number;
  quantity: number;
}

export interface Subscription {
  id: string;
  planId: string;
  status: SubscriptionStatus;
  frequency: SubscriptionFrequency;
  items: SubscriptionItem[];
  nextDeliveryDate: string; // ISO date string
  createdAt: string; // ISO date string
  pausedUntil?: string; // ISO date string
  skippedDeliveries: string[]; // Array of ISO date strings
}

// Subscription plans
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "weekly",
    name: "Weekly Plan",
    frequency: "weekly",
    description: "Get fresh meal kits delivered every week",
    discount: 10,
    price: 0, // Will be calculated based on selected items
    savings: "Save 10% on every order",
    popular: true,
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    frequency: "monthly",
    description: "Get fresh meal kits delivered once a month",
    discount: 15,
    price: 0, // Will be calculated based on selected items
    savings: "Save 15% on every order",
  },
];

// In-memory storage for subscriptions (for MVP - could use localStorage or backend)
let subscriptions: Subscription[] = [];

export function getSubscriptions(): Subscription[] {
  return subscriptions;
}

export function getSubscriptionById(id: string): Subscription | undefined {
  return subscriptions.find((s) => s.id === id);
}

export function getActiveSubscriptions(): Subscription[] {
  return subscriptions.filter((s) => s.status === "active");
}

export function createSubscription(
  planId: string,
  items: SubscriptionItem[],
  frequency: SubscriptionFrequency
): Subscription {
  const plan = subscriptionPlans.find((p) => p.id === planId);
  if (!plan) {
    throw new Error("Invalid subscription plan");
  }

  const subscription: Subscription = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    planId,
    status: "active",
    frequency,
    items,
    nextDeliveryDate: calculateNextDeliveryDate(frequency),
    createdAt: new Date().toISOString(),
    skippedDeliveries: [],
  };

  subscriptions.push(subscription);
  return subscription;
}

export function pauseSubscription(id: string, until?: string): boolean {
  const subscription = subscriptions.find((s) => s.id === id);
  if (!subscription) return false;

  subscription.status = "paused";
  if (until) {
    subscription.pausedUntil = until;
  }
  return true;
}

export function resumeSubscription(id: string): boolean {
  const subscription = subscriptions.find((s) => s.id === id);
  if (!subscription) return false;

  subscription.status = "active";
  subscription.pausedUntil = undefined;
  return true;
}

export function cancelSubscription(id: string): boolean {
  const subscription = subscriptions.find((s) => s.id === id);
  if (!subscription) return false;

  subscription.status = "cancelled";
  return true;
}

export function skipDelivery(id: string, deliveryDate: string): boolean {
  const subscription = subscriptions.find((s) => s.id === id);
  if (!subscription) return false;

  if (!subscription.skippedDeliveries.includes(deliveryDate)) {
    subscription.skippedDeliveries.push(deliveryDate);
    subscription.nextDeliveryDate = calculateNextDeliveryDate(
      subscription.frequency,
      new Date(deliveryDate)
    );
  }
  return true;
}

export function unskipDelivery(id: string, deliveryDate: string): boolean {
  const subscription = subscriptions.find((s) => s.id === id);
  if (!subscription) return false;

  subscription.skippedDeliveries = subscription.skippedDeliveries.filter(
    (d) => d !== deliveryDate
  );
  return true;
}

export function updateSubscriptionItems(
  id: string,
  items: SubscriptionItem[]
): boolean {
  const subscription = subscriptions.find((s) => s.id === id);
  if (!subscription) return false;

  subscription.items = items;
  return true;
}

function calculateNextDeliveryDate(
  frequency: SubscriptionFrequency,
  fromDate?: Date
): string {
  const date = fromDate ? new Date(fromDate) : new Date();
  const nextDate = new Date(date);

  if (frequency === "weekly") {
    nextDate.setDate(nextDate.getDate() + 7);
  } else {
    // monthly
    nextDate.setMonth(nextDate.getMonth() + 1);
  }

  return nextDate.toISOString();
}

export function getPlanById(planId: string): SubscriptionPlan | undefined {
  return subscriptionPlans.find((p) => p.id === planId);
}

