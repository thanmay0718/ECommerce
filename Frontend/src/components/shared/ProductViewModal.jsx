import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Divider } from "@mui/material";
import Status from "./Status";
import { MdClose, MdDone } from "react-icons/md";
import React from "react";

function ProductViewModal({ open, setOpen, product, isAvailable }) {
  const {
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
  } = product;

  const formattedPrice = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });

  const isLowStock = quantity > 0 && quantity <= 5;

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-50"
      onClose={() => setOpen(false)}
    >
      {/* Backdrop */}
      <DialogBackdrop className="fixed inset-0 bg-premium-charcoal/70 backdrop-blur-sm" />

      {/* Modal Wrapper */}
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
          <DialogPanel
            transition
            className="relative w-full max-w-5xl overflow-hidden rounded-xl border border-premium-border bg-premium-card shadow-premium-hover"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close product details"
              className="absolute right-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-premium-border bg-premium-bg/90 text-premium-charcoal shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-premium-charcoal hover:text-white focus:outline-none"
            >
              <MdClose size={18} />
            </button>

            {/* Main Content */}
            <div className="grid md:grid-cols-2">
              {/* ================= IMAGE ================= */}
              <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden bg-[#F5F4F0] dark:bg-[#1E1E24] md:min-h-[600px] border-r border-premium-border/40 p-4">
                <img
                  src={image}
                  alt={productName}
                  className="h-full min-h-[350px] w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 hover:scale-105 md:min-h-[600px]"
                  onError={(e) => {
                    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
                    const bg = isDark ? "16161A" : "F4F3EF";
                    const color = isDark ? "D4B46A" : "6B6B6B";
                    e.currentTarget.src = `https://placehold.co/600x600/${bg}/${color}?text=${encodeURIComponent(productName || "Luxury Item")}`;
                  }}
                />

                {/* Image Gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute left-6 top-6">
                    <span className="rounded-md bg-premium-gold px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] shadow-sm font-sans">
                      SAVE {discount}%
                    </span>
                  </div>
                )}
              </div>

              {/* ================= DETAILS ================= */}
              <div className="flex flex-col p-6 sm:p-8 lg:p-10 bg-premium-card">
                {/* Category / Label */}
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-premium-gold animate-pulse" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-premium-gold font-sans">
                    Exclusive Item
                  </p>
                </div>

                {/* Product Name */}
                <DialogTitle
                  as="h1"
                  className="mt-4 pr-8 text-2xl font-bold uppercase tracking-tight text-premium-text sm:text-3xl leading-tight"
                >
                  {productName}
                </DialogTitle>

                {/* Price Section */}
                <div className="mt-5">
                  {specialPrice ? (
                    <div className="flex flex-wrap items-end gap-3">
                      <span className="text-3xl font-extrabold tracking-tight text-premium-charcoal">
                        {formattedPrice(specialPrice)}
                      </span>

                      <span className="mb-1 text-sm font-medium text-premium-muted line-through">
                        {formattedPrice(price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-extrabold tracking-tight text-premium-charcoal">
                      {formattedPrice(price)}
                    </span>
                  )}

                  {discount > 0 && specialPrice && (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                      Savings of {formattedPrice(price - specialPrice)}
                    </p>
                  )}
                </div>

                {/* Stock Status — Simple direct colored text (No separate container) */}
                <div className="mt-4 flex items-center gap-2">
                  {isAvailable ? (
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <MdDone size={16} /> In Stock {quantity ? `(${quantity} available)` : ""}
                    </span>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <MdClose size={16} /> Out of Stock
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-premium-border/60" />

                {/* Description */}
                <div>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-premium-gold">
                    Details & Composition
                  </h2>

                  <p className="mt-3 text-xs leading-relaxed text-premium-muted font-normal">
                    {description}
                  </p>
                </div>

                {/* Product Information */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {/* Availability */}
                  <div className="rounded-md border border-premium-border bg-premium-bg/50 p-4 shadow-sm">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-premium-muted">
                      Availability
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isAvailable
                            ? "bg-emerald-500"
                            : "bg-rose-500"
                        }`}
                      />

                      <p className="text-xs font-bold uppercase tracking-wider text-premium-charcoal">
                        {isAvailable ? "Ready" : "Sold Out"}
                      </p>
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="rounded-md border border-premium-border bg-premium-bg/50 p-4 shadow-sm">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-premium-muted">
                      Units Available
                    </p>

                    <p className="mt-2 text-xs font-bold text-premium-charcoal uppercase tracking-wider">
                      {quantity || 0} items
                    </p>
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 pt-6 border-t border-premium-border/60 flex justify-end">
                  <button
                    onClick={() => setOpen(false)}
                    type="button"
                    className="rounded-xl bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10] px-8 py-3 text-xs font-bold uppercase tracking-widest shadow-md hover:bg-premium-gold hover:text-[#1A1A1A] dark:hover:bg-premium-gold-light transition-all duration-300 cursor-pointer font-sans"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductViewModal;