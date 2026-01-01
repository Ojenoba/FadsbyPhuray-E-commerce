export default function formatPrice(amount) {
  if (typeof amount !== "number") return "₦0.00";
  return `₦${amount.toFixed(2)}`;
}