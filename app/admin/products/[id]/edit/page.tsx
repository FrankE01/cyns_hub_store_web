import { Suspense } from "react";
import EditProductClient from "./EditProductClient";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

function EditProductSkeleton() {
  return (
    <div className="bg-white p-8 rounded-xl border border-[#EBE5DC] animate-pulse space-y-6 max-w-4xl mx-auto">
      <div className="h-6 w-48 bg-stone-200 rounded" />
      <div className="space-y-4">
        <div className="h-10 bg-stone-100 rounded" />
        <div className="h-32 bg-stone-100 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-10 bg-stone-100 rounded" />
          <div className="h-10 bg-stone-100 rounded" />
        </div>
      </div>
    </div>
  );
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  return (
    <Suspense fallback={<EditProductSkeleton />}>
      <EditProductClient id={id} />
    </Suspense>
  );
}
