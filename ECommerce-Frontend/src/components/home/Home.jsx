import React from 'react'
import HeroBanner from './HeroBanner'
import ProductCard from '../shared/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from '../../store/actions'
import Loader from '../shared/Loader'
import BackendOffline from '../shared/BackendOffline'
import { ShoppingBag, ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useEffect(() =>{
    dispatch(fetchProducts());
  },[dispatch])

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-8 space-y-16">
      {/* ================= HERO SECTION ================= */}
      <div>
        <HeroBanner />
      </div>

      {/* ================= BRAND TRUST PILLARS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-2">
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 p-5 rounded-xl border border-premium-border bg-premium-card shadow-sm transition-all duration-300 hover:shadow-premium-hover">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-image-bg text-premium-gold border border-premium-border">
            <Truck size={18} strokeWidth={1.8} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-premium-text">
              Express Delivery
            </h4>
            <p className="mt-1 text-[11px] text-premium-muted leading-relaxed font-sans">
              Complimentary on orders ₹999+
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 p-5 rounded-xl border border-premium-border bg-premium-card shadow-sm transition-all duration-300 hover:shadow-premium-hover">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-image-bg text-premium-gold border border-premium-border">
            <ShieldCheck size={18} strokeWidth={1.8} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-premium-text">
              Authenticity Guaranteed
            </h4>
            <p className="mt-1 text-[11px] text-premium-muted leading-relaxed font-sans">
              100% verified luxury originals
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 p-5 rounded-xl border border-premium-border bg-premium-card shadow-sm transition-all duration-300 hover:shadow-premium-hover">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-image-bg text-premium-gold border border-premium-border">
            <Sparkles size={18} strokeWidth={1.8} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-premium-text">
              Bespoke Quality
            </h4>
            <p className="mt-1 text-[11px] text-premium-muted leading-relaxed font-sans">
              Finest materials & craftsmanship
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 p-5 rounded-xl border border-premium-border bg-premium-card shadow-sm transition-all duration-300 hover:shadow-premium-hover">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-image-bg text-premium-gold border border-premium-border">
            <Clock size={18} strokeWidth={1.8} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-premium-text">
              24/7 Concierge
            </h4>
            <p className="mt-1 text-[11px] text-premium-muted leading-relaxed font-sans">
              Dedicated client assistance
            </p>
          </div>
        </div>
      </div>

      {/* ================= CURATED BEST SELLERS ================= */}
      <div>
        <div className="flex flex-col justify-center items-center text-center mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-premium-gold font-sans">
            Curated Selection
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-premium-text uppercase">
            Best Sellers
          </h2>
          <div className="mt-4 h-0.5 w-12 bg-premium-gold/60" />
          <p className="mt-4 text-xs sm:text-sm text-premium-muted max-w-md leading-relaxed font-sans">
            Discover our handpicked selection of top-rated items curated just for you.
          </p>
        </div>

        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <BackendOffline
            errorMessage={errorMessage}
            onRetry={() => dispatch(fetchProducts())}
          />
        ) : (!products || products.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-premium-border bg-premium-card rounded-xl p-8 mb-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-premium-border bg-premium-bg text-premium-muted shadow-sm mb-4">
              <ShoppingBag size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-premium-text">
              No Products Available
            </h3>
            <p className="mt-2 text-xs text-premium-muted uppercase tracking-wider max-w-sm font-sans">
              Check back soon for our newest additions and seasonal collections.
            </p>
          </div>
        ) : (
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-8">
            {products?.slice(0, 8).map((item, i) => (
              <ProductCard key={i} {...item} />
            ))}
          </div>
        )}

        {products && products.length > 0 && !isLoading && !errorMessage && (
          <div className="mt-14 flex justify-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-premium-border bg-premium-card px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-premium-text transition-all duration-300 hover:border-premium-gold hover:text-premium-gold shadow-sm font-sans"
            >
              <span>Explore All Products</span>
              <span>→</span>
            </Link>
          </div>
        )}
      </div>

      {/* ================= EDITORIAL BANNER STRIP (THEME AWARE: LIGHT IVORY IN LIGHT MODE, OBSIDIAN IN DARK MODE) ================= */}
      <div className="relative overflow-hidden rounded-2xl border border-premium-border bg-gradient-to-r from-[#F5F5F4] to-[#EAE9E6] dark:from-[#141416] dark:via-[#1C1C20] dark:to-[#141416] p-8 sm:p-14 shadow-premium transition-all duration-300">
        <div className="relative z-10 max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A961] font-sans">
            Limited Release
          </span>
          <h3 className="mt-3 text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-tight text-[#1A1A1A] dark:text-white">
            Curated. Crafted.
            <span className="block text-[#C9A961] mt-1">Yours to Keep.</span>
          </h3>
          <p className="mt-4 text-xs sm:text-sm text-[#6B6B6B] dark:text-stone-300 leading-relaxed max-w-md font-sans">
            Explore seasonal designs made with exceptional care and timeless aesthetic standards.
          </p>
          <div className="mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C9A961] text-[#1A1A1A] dark:bg-premium-gold dark:text-[#0E0E10] px-7 py-3.5 text-xs font-bold uppercase tracking-widest shadow-md transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-premium-gold-light font-sans"
            >
              <span>Discover Collection</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home