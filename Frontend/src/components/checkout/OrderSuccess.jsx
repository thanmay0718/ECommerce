import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Check, 
    Sparkles, 
    ShoppingBag, 
    Printer, 
    Package, 
    Truck, 
    Clock, 
    ShieldCheck,
    ArrowRight
} from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';

const OrderSuccess = ({ orderDetails }) => {
    const orderId = orderDetails?.orderId || Math.floor(100000 + Math.random() * 900000);
    const orderTotal = orderDetails?.totalAmount || 0;
    const orderDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handlePrintInvoice = () => {
        window.print();
    };

    return (
        <div className="mx-auto max-w-2xl text-center py-6 sm:py-10 space-y-8 animate-fadeIn">
            {/* Celebratory Luxury Animation Badge */}
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-premium-gold/20 animate-ping" />
                <div className="absolute inset-2 rounded-full bg-premium-gold/40 animate-pulse" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-premium-charcoal text-premium-gold shadow-2xl ring-4 ring-premium-gold/30">
                    <Check size={38} strokeWidth={3} />
                </div>
            </div>

            {/* Header Text */}
            <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-premium-gold bg-premium-gold/10 px-3.5 py-1.5 rounded-full border border-premium-gold/25 mb-3">
                    <Sparkles size={12} />
                    <span>Purchase Confirmed</span>
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-premium-charcoal">
                    Thank You for Your Order
                </h1>
                <div className="mx-auto mt-4 h-0.5 w-12 bg-premium-gold/60" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-premium-muted">
                    We are hand-preparing your parcel with signature white-glove care.
                </p>
            </div>

            {/* Order Details Receipt Card */}
            <div className="overflow-hidden rounded-2xl border border-premium-border bg-white text-left shadow-lg shadow-black/[0.03]">
                <div className="border-b border-premium-border/70 bg-[#FAFAF9] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-premium-muted">
                            Order Reference
                        </span>
                        <p className="text-sm font-bold tracking-wider text-premium-charcoal">
                            #ORD-{orderId}
                        </p>
                    </div>
                    <div className="sm:text-right">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-premium-muted">
                            Order Date
                        </span>
                        <p className="text-xs font-semibold text-premium-charcoal">
                            {orderDate}
                        </p>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Delivery Timeline Indicator */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-premium-charcoal mb-4">
                            Delivery Progression
                        </h4>
                        <div className="grid grid-cols-3 gap-2 relative">
                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-premium-charcoal text-premium-gold text-xs font-bold mb-2 shadow-xs">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="text-[10px] font-bold uppercase text-premium-charcoal">Confirmed</span>
                                <span className="text-[9px] text-premium-muted">Today</span>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-premium-gold/20 border border-premium-gold text-premium-charcoal text-xs font-bold mb-2">
                                    <Package size={14} />
                                </div>
                                <span className="text-[10px] font-bold uppercase text-premium-charcoal">Handcrafted</span>
                                <span className="text-[9px] text-premium-muted">Processing</span>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAF9] border border-premium-border text-premium-muted text-xs font-bold mb-2">
                                    <Truck size={14} />
                                </div>
                                <span className="text-[10px] font-bold uppercase text-premium-muted">Delivery</span>
                                <span className="text-[9px] text-premium-muted">In 2-3 Days</span>
                            </div>
                        </div>
                    </div>

                    {/* Notification Alert */}
                    <div className="flex items-center gap-3 p-4 rounded-xl border border-premium-border/60 bg-[#FAFAF9]/80 text-xs text-premium-charcoal/80">
                        <Clock size={16} className="text-premium-gold shrink-0" />
                        <span>A digital invoice & live courier dispatch tracking link has been dispatched to your email.</span>
                    </div>
                </div>
            </div>

            {/* Actions CTA Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                    to="/products"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-premium-charcoal text-xs font-bold uppercase tracking-widest text-white hover:bg-premium-gold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                    <ShoppingBag size={15} />
                    <span>Explore More Collections</span>
                </Link>

                <button
                    type="button"
                    onClick={handlePrintInvoice}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg border border-premium-border bg-white text-xs font-bold uppercase tracking-wider text-premium-charcoal hover:bg-[#FAFAF9] shadow-xs transition-all cursor-pointer"
                >
                    <Printer size={15} />
                    <span>Print Order Slip</span>
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
