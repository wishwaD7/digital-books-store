/**
 * Calculate discounted price
 */
export const calculateDiscountedPrice = (
  price: number,
  discount: number
): number => {
  return price * (1 - discount);
};

/**
 * Format currency to USD
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
};
