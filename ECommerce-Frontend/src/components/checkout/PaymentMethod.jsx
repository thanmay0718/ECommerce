import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    CreditCard, 
    Smartphone, 
    Building, 
    Banknote, 
    ShieldCheck, 
    Lock, 
    ArrowLeft, 
    ArrowRight, 
    Check,
    Sparkles,
    CheckCircle2
} from 'lucide-react';
import { addPaymentMethod } from '../../store/actions';
import toast from 'react-hot-toast';

const paymentOptions = [
    {
        id: "card",
        title: "Credit / Debit Card",
        description: "Visa, MasterCard, American Express, RuPay",
        icon: CreditCard,
        badge: "Recommended",
    },
    {
        id: "upi",
        title: "UPI / Instant Transfer",
        description: "Google Pay, PhonePe, Paytm, BHIM & UPI ID",
        icon: Smartphone,
        badge: "Instant 0% Fee",
    },
    {
        id: "netbanking",
        title: "Net Banking",
        description: "Direct transfer from 50+ Premier Banks",
        icon: Building,
    },
    {
        id: "cod",
        title: "Cash on Delivery",
        description: "Pay with cash or card upon doorstep receipt",
        icon: Banknote,
    }
];

const PaymentMethod = ({ onNext, onBack }) => {
    const dispatch = useDispatch();
    const { paymentMethod } = useSelector((state) => state.auth);
    const [selectedMethod, setSelectedMethod] = useState(paymentMethod || "card");

    // Card Details Form State
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "4532 •••• •••• 8892",
        cardHolder: "ALEXANDER M. VANE",
        expiryDate: "08/29",
        cvv: "•••",
    });

    // UPI State
    const [upiId, setUpiId] = useState("");
    const [selectedBank, setSelectedBank] = useState("HDFC Bank");

    const handleSelect = (id) => {
        setSelectedMethod(id);
        dispatch(addPaymentMethod(id));
    };

    const handleContinue = () => {
        if (!selectedMethod) {
            toast.error("Please select a payment method");
            return;
        }
        dispatch(addPaymentMethod(selectedMethod));
        onNext?.();
    };

    return (
        <div className="space-y-6">
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-premium-border/70 pb-5">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-premium-gold">
                        Step 2 of 4
                    </span>
                    <h2 className="mt-1 text-2xl font-bold uppercase tracking-tight text-premium-charcoal">
                        Payment Selection
                    </h2>
                    <p className="mt-1 text-xs text-premium-muted">
                        Select your preferred ultra-secure transaction channel
                    </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-full w-fit">
                    <Lock size={13} />
                    <span>256-Bit Encrypted Vault</span>
                </div>
            </div>

            {/* Payment Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentOptions.map((opt) => {
                    const isSelected = selectedMethod === opt.id;
                    const Icon = opt.icon;

                    return (
                        <div
                            key={opt.id}
                            onClick={() => handleSelect(opt.id)}
                            className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
                                isSelected
                                    ? "border-premium-charcoal bg-white ring-2 ring-premium-charcoal/10 shadow-lg shadow-black/[0.04]"
                                    : "border-premium-border/80 bg-white hover:border-premium-charcoal/40 hover:shadow-md"
                            }`}
                        >
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                                        isSelected
                                            ? "bg-premium-charcoal text-premium-gold shadow-sm"
                                            : "bg-[#FAFAF9] text-premium-muted group-hover:text-premium-charcoal"
                                    }`}>
                                        <Icon size={20} strokeWidth={1.75} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-premium-charcoal">
                                                {opt.title}
                                            </h4>
                                            {opt.badge && (
                                                <span className="text-[9px] font-bold uppercase tracking-widest bg-premium-gold/15 text-premium-charcoal px-2 py-0.5 rounded-full border border-premium-gold/30">
                                                    {opt.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="mt-0.5 text-[11px] text-premium-muted">
                                            {opt.description}
                                        </p>
                                    </div>
                                </div>

                                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                                    isSelected 
                                        ? "border-premium-charcoal bg-premium-charcoal text-premium-gold" 
                                        : "border-premium-border bg-white"
                                }`}>
                                    {isSelected && <Check size={11} strokeWidth={3} />}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Selected Method Details Panel */}
            <div className="rounded-2xl border border-premium-border/80 bg-[#FAFAF9]/70 p-6 shadow-inner transition-all">
                {selectedMethod === "card" && (
                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-premium-charcoal">
                                Card Credentials
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-premium-muted">
                                <span>Visa</span>
                                <span>•</span>
                                <span>MasterCard</span>
                                <span>•</span>
                                <span>Amex</span>
                            </div>
                        </div>

                        {/* Luxury Card Graphic Preview */}
                        <div className="relative mx-auto max-w-sm rounded-2xl bg-gradient-to-tr from-[#1A1A1A] via-[#2A2A2A] to-[#3A3A3A] p-6 text-white shadow-xl shadow-black/15 border border-white/10 overflow-hidden">
                            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-premium-gold/10 blur-2xl pointer-events-none" />
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={16} className="text-premium-gold" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-premium-gold">
                                        Signature Privilege
                                    </span>
                                </div>
                                <div className="h-6 w-9 rounded-sm bg-premium-gold/30 border border-premium-gold/50 flex items-center justify-center text-[9px] font-bold text-premium-gold">
                                    EMV
                                </div>
                            </div>

                            <div className="my-4 text-center tracking-[0.22em] font-mono text-base text-gray-200">
                                {cardDetails.cardNumber}
                            </div>

                            <div className="mt-6 flex items-end justify-between text-[10px] uppercase tracking-wider">
                                <div>
                                    <span className="text-gray-400 block text-[8px]">Card Holder</span>
                                    <span className="font-semibold text-gray-100">{cardDetails.cardHolder}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-gray-400 block text-[8px]">Expires</span>
                                    <span className="font-semibold text-gray-100">{cardDetails.expiryDate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="sm:col-span-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-premium-charcoal/80 block mb-1.5">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    defaultValue="4532 8821 9920 8892"
                                    className="w-full h-11 px-4 rounded-lg border border-premium-border bg-white text-xs font-medium text-premium-charcoal focus:border-premium-charcoal focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-premium-charcoal/80 block mb-1.5">
                                    Expiration (MM/YY)
                                </label>
                                <input
                                    type="text"
                                    defaultValue="08/29"
                                    className="w-full h-11 px-4 rounded-lg border border-premium-border bg-white text-xs font-medium text-premium-charcoal focus:border-premium-charcoal focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-premium-charcoal/80 block mb-1.5">
                                    Security CVV
                                </label>
                                <input
                                    type="password"
                                    defaultValue="882"
                                    maxLength={4}
                                    className="w-full h-11 px-4 rounded-lg border border-premium-border bg-white text-xs font-medium text-premium-charcoal focus:border-premium-charcoal focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {selectedMethod === "upi" && (
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-premium-charcoal">
                            Enter UPI Virtual Address
                        </h4>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="yourname@okhdfcbank / yourname@paytm"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                className="flex-1 h-11 px-4 rounded-lg border border-premium-border bg-white text-xs font-medium text-premium-charcoal focus:border-premium-charcoal focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => toast.success("UPI ID Verified Successfully")}
                                className="h-11 px-5 rounded-lg bg-premium-charcoal text-[11px] font-bold uppercase tracking-wider text-white hover:bg-premium-gold transition-colors cursor-pointer shrink-0"
                            >
                                Verify
                            </button>
                        </div>
                        <p className="text-[11px] text-premium-muted">
                            A payment request will be triggered to your UPI app upon order placement.
                        </p>
                    </div>
                )}

                {selectedMethod === "netbanking" && (
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-premium-charcoal">
                            Select Banking Institution
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra", "Citibank"].map((bank) => (
                                <button
                                    key={bank}
                                    type="button"
                                    onClick={() => setSelectedBank(bank)}
                                    className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-left ${
                                        selectedBank === bank
                                            ? "border-premium-charcoal bg-white shadow-xs text-premium-charcoal ring-1 ring-premium-charcoal"
                                            : "border-premium-border/80 bg-white text-premium-muted hover:border-premium-charcoal/40"
                                    }`}
                                >
                                    {bank}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {selectedMethod === "cod" && (
                    <div className="flex items-start gap-3.5 p-4 rounded-xl border border-amber-200/80 bg-amber-50/50 text-amber-950">
                        <CheckCircle2 size={18} className="text-amber-700 shrink-0 mt-0.5" />
                        <div>
                            <h5 className="text-xs font-bold uppercase tracking-wider">
                                Doorstep Payment Preparedness
                            </h5>
                            <p className="mt-1 text-[11px] text-amber-900/80 leading-relaxed">
                                Exact change or card tap upon delivery ensures seamless concierge handover. An OTP verification will be required upon courier arrival.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Footer */}
            <div className="pt-6 border-t border-premium-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg border border-premium-border bg-white text-xs font-bold uppercase tracking-wider text-premium-charcoal hover:bg-[#FAFAF9] transition-all cursor-pointer"
                >
                    <ArrowLeft size={14} />
                    <span>Back to Address</span>
                </button>

                <button
                    type="button"
                    onClick={handleContinue}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-lg bg-premium-charcoal text-xs font-bold uppercase tracking-widest text-white hover:bg-premium-gold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                    <span>Proceed to Order Review</span>
                    <ArrowRight size={15} />
                </button>
            </div>
        </div>
    );
};

export default PaymentMethod;
