import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { 
  MapPin, 
  CreditCard, 
  CheckCircle, 
  Sparkles, 
  ShoppingBag, 
  ArrowLeft,
  Lock,
  ShieldCheck,
  Check
} from "lucide-react";
import AddressInfo from "./AddressInfo";
import PaymentMethod from "./PaymentMethod";
import OrderReview from "./OrderReview";
import OrderSuccess from "./OrderSuccess";
import CheckoutSummary from "./CheckoutSummary";

const steps = [
  { id: 0, title: "Address", icon: MapPin, subtitle: "Shipping details" },
  { id: 1, title: "Payment", icon: CreditCard, subtitle: "Select method" },
  { id: 2, title: "Review", icon: CheckCircle, subtitle: "Confirm order" },
  { id: 3, title: "Receipt", icon: Sparkles, subtitle: "Order status" },
];

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [orderDetails, setOrderDetails] = useState(null);

  // Shared checkout options
  const [giftPackaging, setGiftPackaging] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const { cart } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.auth);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const handleOrderPlaced = (response) => {
    setOrderDetails(response);
    setActiveStep(3);
  };

  // If cart is empty and not on success step
  if ((!cart || cart.length === 0) && activeStep !== 3) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-premium-bg">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-premium-border bg-white text-premium-charcoal shadow-sm mb-4">
          <ShoppingBag size={36} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-premium-gold mb-2">
          Your Shopping Bag
        </span>
        <h1 className="text-2xl font-bold uppercase tracking-wider text-premium-charcoal text-center">
          Your Cart is Empty
        </h1>
        <p className="mt-2 max-w-sm text-center text-xs text-premium-muted leading-relaxed">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-premium-charcoal px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md hover:bg-premium-gold transition-all duration-300"
        >
          <ArrowLeft size={14} />
          <span>Explore Collections</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-premium-bg py-8 sm:py-12">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* ================= PAGE TITLE & BREADCRUMB ================= */}
        <div className="mb-8 sm:mb-12 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-premium-gold mb-2">
            Signature Checkout
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-premium-charcoal">
            Secure Checkout
          </h1>
          <div className="mt-3 h-0.5 w-12 bg-premium-gold/60" />
        </div>

        {/* ================= BESPOKE LUXURY STEPPER ================= */}
        <div className="mb-10 sm:mb-14 mx-auto max-w-4xl">
          <div className="relative flex items-center justify-between">
            {/* Connecting Track Line */}
            <div className="absolute left-0 top-5 sm:top-6 -translate-y-1/2 h-0.5 w-full bg-premium-border" />
            <div 
              className="absolute left-0 top-5 sm:top-6 -translate-y-1/2 h-0.5 bg-gradient-to-r from-premium-charcoal to-premium-gold transition-all duration-500"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />

            {/* Stepper Nodes */}
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = activeStep > index;
              const isActive = activeStep === index;
              const isClickable = activeStep > index && activeStep !== 3;

              return (
                <div 
                  key={step.id} 
                  className={`relative z-10 flex flex-col items-center ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                  onClick={() => isClickable && setActiveStep(index)}
                >
                  <div 
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isCompleted
                        ? "border-premium-charcoal bg-premium-charcoal text-premium-gold shadow-md"
                        : isActive
                        ? "border-premium-gold bg-white text-premium-charcoal shadow-lg ring-4 ring-premium-gold/20 scale-105"
                        : "border-premium-border bg-[#FAFAF9] text-premium-muted"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={18} strokeWidth={3} />
                    ) : (
                      <Icon size={18} strokeWidth={isActive ? 2.2 : 1.75} />
                    )}
                  </div>

                  <div className="mt-2.5 text-center">
                    <span 
                      className={`block text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors ${
                        isActive || isCompleted ? "text-premium-charcoal" : "text-premium-muted"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="hidden sm:block text-[9px] font-medium text-premium-muted">
                      {step.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= MAIN CONTENT LAYOUT ================= */}
        {activeStep === 3 ? (
          /* Success Screen - Full Centered Width */
          <OrderSuccess orderDetails={orderDetails} />
        ) : (
          /* Steps 0, 1, 2 - 2-Column Split */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Step Form Content */}
            <div className="lg:col-span-7 xl:col-span-8 rounded-2xl border border-premium-border/80 bg-white p-6 sm:p-8 shadow-sm">
              {activeStep === 0 && (
                <AddressInfo 
                  onNext={() => setActiveStep(1)} 
                />
              )}

              {activeStep === 1 && (
                <PaymentMethod 
                  onNext={() => setActiveStep(2)} 
                  onBack={() => setActiveStep(0)} 
                />
              )}

              {activeStep === 2 && (
                <OrderReview 
                  onBack={() => setActiveStep(1)} 
                  onOrderPlaced={handleOrderPlaced}
                  appliedCoupon={appliedCoupon}
                  giftPackaging={giftPackaging}
                />
              )}
            </div>

            {/* Right: Sticky Order Summary */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-4">
              <CheckoutSummary
                giftPackaging={giftPackaging}
                setGiftPackaging={setGiftPackaging}
                discount={discount}
                setDiscount={setDiscount}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                appliedCoupon={appliedCoupon}
                setAppliedCoupon={setAppliedCoupon}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
