import { notFound } from "next/navigation";
import ProductDetailPageClient from "@/components/ProductDetailPageClient";

function isObjectId(str) {
  return /^[0-9a-fA-F]{24}$/.test(str);
}

export async function generateMetadata({ params }) {
  const { param } = await params; // ✅ unwrap
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const endpoint = isObjectId(param)
    ? `${base}/products/${param}`
    : `${base}/products/slug/${param}`;

  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) {
    return { title: "Product not found - FADs by PHURAY" };
  }

  const product = await res.json();

  return {
    title: product?.name ? `${product.name} - FADs by PHURAY` : "Product - FADs by PHURAY",
    description: product?.description || "View product details and reviews.",
    openGraph: {
      title: product?.name || "Product - FADs by PHURAY",
      description: product?.description || "Discover product details and reviews.",
      url: `https://yourdomain.com/products/${param}`,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }) {
  const { param } = await params; // ✅ unwrap
  if (!param) notFound();

  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const endpoint = isObjectId(param)
    ? `${base}/products/${param}`
    : `${base}/products/slug/${param}`;

  const [productRes, reviewsRes, relatedRes] = await Promise.all([
    fetch(endpoint, { cache: "no-store" }),
    fetch(`${base}/reviews/${param}`, { cache: "no-store" }),
    fetch(`${base}/products/${param}/related`, { cache: "no-store" }),
  ]);

  if (!productRes.ok) notFound();

  const productJson = await productRes.json();
  const reviewsJson = reviewsRes.ok ? await reviewsRes.json() : { data: [] };
  const relatedJson = relatedRes.ok ? await relatedRes.json() : { data: [] };

  return (
    <ProductDetailPageClient
      product={productJson?.data || productJson || null}
      reviews={reviewsJson?.data || []}
      relatedProducts={relatedJson?.data || []}
      productId={param}
    />
  );
}