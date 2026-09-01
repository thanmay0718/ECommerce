import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../../utils/formatPrice";
import {
  ShieldCheck,
  Truck,
  Gift,
  Tag,
  Lock,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  PackageCheck,
} from "lucide-react";
import toast from "react-hot-toast";

const CheckoutSummary = ({
  giftPackaging = false,
  setGiftPackaging,
  discount = 0,
  setDiscount,
  couponCode = "",
  setCouponCode,
  appliedCoupon = null,
  setAppliedCoupon,
}) => {
  const { cart } = useSelector((state) => state.carts);
  const [couponInput, setCouponInput] = useState(couponCode || "");
  const [isApplying, setIsApplying] = useState(false);
  const [showItems, setShowItems] = useState(true);

  const subtotal =
    cart?.reduce(
      (acc, cur) =>
        acc +
        Number(cur?.specialPrice || cur?.price || 0) *
          Number(cur?.quantity || 1),
      0,
    ) || 0;

  const shipping = 0; // Complimentary luxury shipping
  const estimatedTax =
    subtotal > 0 ? Math.round(subtotal * 0.05 * 100) / 100 : 0;
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const finalTotal = Math.max(0, subtotal + estimatedTax - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      toast.error("Please enter a promo code");
      return;
    }

    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      if (code === "LUXURY20") {
        const disc = Math.round(subtotal * 0.2 * 100) / 100;
        setAppliedCoupon?.({
          code: "LUXURY20",
          discountAmount: disc,
          label: "20% Exclusive Privilege",
        });
        setDiscount?.(disc);
        setCouponCode?.("LUXURY20");
        toast.success("Promo code applied: 20% Privilege Discount!");
      } else if (code === "PREMIUM10" || code === "WELCOME10") {
        const disc = Math.round(subtotal * 0.1 * 100) / 100;
        setAppliedCoupon?.({
          code,
          discountAmount: disc,
          label: "10% Welcome Reward",
        });
        setDiscount?.(disc);
        setCouponCode?.(code);
        toast.success("Promo code applied: 10% Off!");
      } else if (code === "VIP50" && subtotal >= 200) {
        const disc = 50;
        setAppliedCoupon?.({
          code: "VIP50",
          discountAmount: disc,
          label: "$50 VIP Credit",
        });
        setDiscount?.(disc);
        setCouponCode?.("VIP50");
        toast.success("Promo code applied: $50 VIP Credit!");
      } else {
        toast.error("Invalid promo code. Try 'LUXURY20' or 'PREMIUM10'");
      }
    }, 400);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon?.(null);
    setDiscount?.(0);
    setCouponCode?.("");
    setCouponInput("");
    toast.success("Promo code removed");
  };

  return (
    <div className="w-full rounded-2xl border border-premium-border bg-premium-card shadow-xl overflow-hidden transition-all duration-300">
      {/* Summary Top Header */}
      <div className="border-b border-premium-border bg-premium-bg px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-premium-bg text-premium-gold border border-premium-border shadow-xs">
            <Sparkles size={14} />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-premium-text">
              Order Summary
            </h3>
            <p className="text-[11px] text-premium-muted">
              {cart?.length || 0} {cart?.length === 1 ? "item" : "items"} in bag
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowItems(!showItems)}
          className="flex items-center gap-1 text-[11px] font-semibold text-premium-muted hover:text-premium-text transition-colors cursor-pointer"
        >
          <span>{showItems ? "Hide Items" : "View Items"}</span>
          {showItems ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Collapsible Item Gallery */}
      {showItems && (
        <div className="max-h-64 overflow-y-auto px-6 py-4 divide-y divide-premium-border/50 border-b border-premium-border/60">
          {cart && cart.length > 0 ? (
            cart.map((item, idx) => (
              <div
                key={idx}
                className="py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-premium-border bg-white dark:bg-[#1E1E24] p-1 shadow-inner">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.productName}
                      className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80";
                      }}
                    />
                    <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-premium-gold text-[9px] font-bold text-[#0E0E10] shadow-xs">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4
                      className="truncate text-xs font-semibold text-premium-text"
                      title={item.productName}
                    >
                      {item.productName}
                    </h4>
                    <p className="mt-0.5 text-[11px] text-premium-muted">
                      Qty: {item.quantity} ×{" "}
                      {formatPrice(
                        Number(item.specialPrice || item.price || 0),
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-premium-text">
                    {formatPrice(
                      Number(item.specialPrice || item.price || 0) *
                        Number(item.quantity || 1),
                    )}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-xs text-premium-muted">
              No items in cart
            </p>
          )}
        </div>
      )}

      <div className="p-6 space-y-5">
        {/* Promo Code Input */}
        <div>
          {!appliedCoupon ? (
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-premium-muted"
                />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. LUXURY20)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full h-10.5 pl-9 pr-3 rounded-xl border border-premium-border bg-premium-bg text-xs font-medium uppercase tracking-wider text-premium-text placeholder:text-premium-muted/50 placeholder:normal-case focus:border-premium-gold focus:outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isApplying || !couponInput.trim()}
                className="h-10.5 px-4 rounded-xl bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10] text-[11px] font-bold uppercase tracking-wider hover:bg-premium-gold hover:text-[#1A1A1A] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                {isApplying ? "Applying..." : "Apply"}
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Check size={12} strokeWidth={3} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">
                    {appliedCoupon.code}
                  </p>
                  <p className="text-[10px] font-medium opacity-80">
                    {appliedCoupon.label} (-
                    {formatPrice(appliedCoupon.discountAmount)})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-[11px] font-bold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Luxury Signature Gift Packaging Toggle */}
        <div
          onClick={() => setGiftPackaging?.(!giftPackaging)}
          className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
            giftPackaging
              ? "border-premium-gold bg-premium-bg shadow-xs"
              : "border-premium-border bg-premium-bg hover:border-premium-gold"
          }`}
        >
          <div
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
              giftPackaging
                ? "bg-premium-gold border-premium-gold text-[#0E0E10]"
                : "border-premium-border bg-premium-card"
            }`}
          >
            {giftPackaging && <Check size={12} strokeWidth={3} />}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Gift size={13} className="text-premium-gold" />
                <span className="text-xs font-bold uppercase tracking-wider text-premium-text">
                  Complimentary Gift Box
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                FREE
              </span>
            </div>
            <p className="mt-1 text-[11px] text-premium-muted leading-relaxed">
              Signature satin ribbon box with handwritten luxury greeting card.
            </p>
          </div>
        </div>

        {/* Price Breakdown Calculation */}
        <div className="space-y-2.5 pt-2 text-xs">
          <div className="flex justify-between text-premium-muted">
            <span>Bag Subtotal</span>
            <span className="font-semibold text-premium-text">
              {formatPrice(subtotal)}
            </span>
          </div>

          <div className="flex justify-between text-premium-muted">
            <span className="flex items-center gap-1.5">
              <Truck size={13} className="text-premium-gold" />
              <span>Express Insured Shipping</span>
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase text-[11px] tracking-wider">
              Complimentary
            </span>
          </div>

          <div className="flex justify-between text-premium-muted">
            <span>Estimated Sales Tax (5%)</span>
            <span className="font-semibold text-premium-text">
              {formatPrice(estimatedTax)}
            </span>
          </div>

          {appliedCoupon && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="flex items-center gap-1">
                <Tag size={12} />
                <span>Privilege Discount ({appliedCoupon.code})</span>
              </span>
              <span className="font-bold">
                -{formatPrice(appliedCoupon.discountAmount)}
              </span>
            </div>
          )}

          <div className="border-t border-premium-border pt-4 mt-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-premium-text">
                  Total Amount
                </span>
                <p className="text-[10px] text-premium-muted uppercase tracking-wider mt-0.5">
                  All duties & taxes included
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold tracking-tight text-premium-text">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust & Guarantee Badges */}
        <div className="rounded-xl border border-premium-border bg-premium-bg p-4 space-y-2.5">
          <div className="flex items-center gap-2.5 text-[11px] font-semibold text-premium-text">
            <ShieldCheck size={15} className="text-premium-gold shrink-0" />
            <span>100% Certified Authentic & Insured Delivery</span>
          </div>
          <div className="flex items-center gap-2.5 text-[11px] font-semibold text-premium-text">
            <PackageCheck size={15} className="text-premium-gold shrink-0" />
            <span>30-Day Hassle-Free Returns & Exchange</span>
          </div>
          <div className="flex items-center gap-2.5 text-[11px] font-semibold text-premium-muted pt-1 border-t border-premium-border/40">
            <Lock size={13} className="text-premium-muted shrink-0" />
            <span className="text-[10px] uppercase tracking-widest">
              End-to-End 256-Bit SSL Encryption
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
