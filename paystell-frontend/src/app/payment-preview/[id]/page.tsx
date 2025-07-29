"use client";

export const dynamic = "force-dynamic";
import { useWalletStore } from "@/lib/wallet/wallet-store";

import PaymentPreview, {
  type ProductData,
} from "@/components/PaymentLinkPreview/payment-link-preview";
import Image from "next/image";

function getProductData(
  id: string,
  merchantWalletAddress: string | null
): ProductData {
  const productName = decodeURIComponent(id.replace(/-/g, " "));
  return {
    name: productName,
    sku: "SKU-WH-PRO-2023",
    price: 79.99,
    serviceFee: 10.0,
    features: [
      "Noise cancellation technology",
      "40-hour battery life",
      "Premium sound quality",
      "1-year warranty",
    ],
    merchantWalletAddress: merchantWalletAddress || "",
  };
}

export default function PaymentPreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const { publicKey } = useWalletStore();
  const product = getProductData(params.id, publicKey);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-28 h-28 p-8 flex-shrink-0 rounded">
        <Image
          src={product.imageUrl || "/favicon.ico"}
          alt={product.name}
          width={112}
          height={112}
          className="object-cover w-full h-full rounded"
        />
      </div>
      <PaymentPreview product={product} />
    </div>
  );
}
