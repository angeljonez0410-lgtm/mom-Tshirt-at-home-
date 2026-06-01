// Simple in-memory purchase storage for MVP
// In production, replace with a real database (Prisma + PostgreSQL, MongoDB, etc.)

interface Purchase {
  id: string;
  email: string;
  stripeSessionId: string;
  purchasedAt: Date;
  amount: number;
  productName: string;
}

// Simple in-memory store - persists during deployment
const purchases = new Map<string, Purchase>();

export function recordPurchase(
  email: string,
  stripeSessionId: string,
  amount: number,
  productName: string
): Purchase {
  const purchase: Purchase = {
    id: `purchase_${Date.now()}`,
    email,
    stripeSessionId,
    purchasedAt: new Date(),
    amount,
    productName,
  };

  purchases.set(stripeSessionId, purchase);
  return purchase;
}

export function getPurchaseByEmail(email: string): Purchase | undefined {
  for (const purchase of purchases.values()) {
    if (purchase.email === email) {
      return purchase;
    }
  }
  return undefined;
}

export function getPurchaseBySessionId(
  stripeSessionId: string
): Purchase | undefined {
  return purchases.get(stripeSessionId);
}

export function hasPurchased(email: string): boolean {
  return !!getPurchaseByEmail(email);
}

export function getAllPurchases(): Purchase[] {
  return Array.from(purchases.values());
}
