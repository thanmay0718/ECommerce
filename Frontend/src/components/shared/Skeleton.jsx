import React from "react";

/**
 * ProductCardSkeleton — matches exact dimensions/layout of ProductCard.jsx.
 * Uses the skeleton-shimmer utility defined in index.css.
 * Exported as both Skeleton (default) and ProductCardSkeleton for clarity.
 */
const ProductCardSkeleton = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-lg border border-premium-border bg-premium-card shadow-sm">
    {/* Image area */}
    <div className="relative h-64 w-full overflow-hidden border-b border-premium-border/30">
      <div className="h-full w-full skeleton-shimmer" />
      {/* Stock badge placeholder */}
      <div className="absolute left-4 top-4 h-4 w-16 rounded-md skeleton-shimmer" />
    </div>

    {/* Content area */}
    <div className="flex flex-1 flex-col p-5">
      {/* Product name */}
      <div className="h-4 w-3/4 rounded skeleton-shimmer" />

      {/* Description lines */}
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full rounded skeleton-shimmer" />
        <div className="h-3 w-2/3 rounded skeleton-shimmer" />
      </div>

      {/* Price + button */}
      <div className="mt-auto border-t border-premium-border/40 pt-4 flex items-center justify-between gap-3">
        <div className="h-5 w-20 rounded skeleton-shimmer" />
        <div className="h-9 w-16 rounded-md skeleton-shimmer" />
      </div>
    </div>
  </div>
);

/**
 * Skeleton — generic text-content skeleton (used in address loading, etc.)
 * Kept for backward compatibility.
 */
const TextSkeleton = () => (
  <div role="status" className="space-y-3 w-full animate-pulse">
    {[100, 75, 90, 60, 80].map((w, i) => (
      <div
        key={i}
        className="h-3 rounded-full skeleton-shimmer"
        style={{ width: `${w}%` }}
      />
    ))}
    <div className="grid grid-cols-2 gap-3 pt-2">
      {[55, 70, 80, 50].map((w, i) => (
        <div
          key={i}
          className="h-3 rounded-full skeleton-shimmer"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  </div>
);

// Default export kept as generic text skeleton for backward-compat
// (AddressInfo imports <Skeleton /> for loading state)
const Skeleton = TextSkeleton;

export { ProductCardSkeleton };
export default Skeleton;