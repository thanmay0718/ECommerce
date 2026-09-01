import React from "react";
import { ProductCardSkeleton } from "./Skeleton";

const Loader = ({ text, count = 8 }) => {
  return (
    <div className="w-full py-8">
      {/* Premium product-card shaped skeleton grid */}
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-8">
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
      {text && (
        <p className="mt-6 text-center text-xs font-semibold uppercase tracking-widest text-premium-muted animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
