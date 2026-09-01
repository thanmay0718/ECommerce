import React from 'react'
import { MdArrowBack, MdShoppingCart, MdLockOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ItemContent from './ItemContent'
import { formatPrice } from '../../utils/formatPrice'

const Cart = () => {
  const distpatch = useDispatch();
  const { cart } = useSelector((state) => state.carts);
  const newCart = { ...cart };

  newCart.totalPrice = cart?.reduce(
    (acc, cur) =>
      acc + Number(cur?.specialPrice) * Number(cur?.quantity),
    0
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center px-4 bg-premium-bg pt-20 sm:pt-24 pb-12">

        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-premium-border bg-premium-card text-premium-text shadow-sm">
          <MdShoppingCart
            size={36}
          />
        </div>

        <h1 className="mt-8 text-2xl font-bold uppercase tracking-wider text-premium-text text-center">
          Your Shopping Bag is Empty
        </h1>

        <p className="mt-3 max-w-sm text-center text-xs uppercase tracking-wider text-premium-muted leading-relaxed">
          Please add items to your cart before proceeding to checkout.
        </p>

        <Link
          to="/products"
          className="
            group
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10]
            px-8
            py-3.5
            text-xs
            font-bold
            uppercase
            tracking-widest
            shadow-md
            transition-all
            duration-300
            hover:bg-premium-gold
            hover:text-[#1A1A1A]
          "
        >
          <MdArrowBack
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-premium-bg">

      {/* ================= CONTAINER WITH TOP MARGIN FOR STICKY NAVBAR (BUG 5 FIX) ================= */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-12">

        {/* ================= PAGE HEADER ================= */}
        <div className="mb-10 flex flex-col items-center">

          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-premium-gold mb-3 font-sans">
            Shopping Bag
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-premium-text">
            Your Cart
          </h1>

          <div className="mt-4 h-0.5 w-12 bg-premium-gold/60" />

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-premium-muted">
            Review your selections before checking out
          </p>

        </div>


        {/* ================= CART CONTAINER ================= */}
        <div className="overflow-hidden rounded-2xl border border-premium-border bg-premium-card shadow-sm">

          {/* ================= CART HEADER (BUG 4 FIX) ================= */}
          <div
            className="
              hidden
              md:grid
              md:grid-cols-5
              items-center
              gap-6
              border-b
              border-premium-border
              bg-premium-bg
              px-6
              py-4.5
            "
          >

            <div className="md:col-span-2 text-[10px] font-bold uppercase tracking-widest text-premium-muted">
              Product Details
            </div>

            <div className="text-[10px] font-bold uppercase tracking-widest text-premium-muted justify-self-center">
              Price
            </div>

            <div className="text-[10px] font-bold uppercase tracking-widest text-premium-muted justify-self-center">
              Quantity
            </div>

            <div className="text-[10px] font-bold uppercase tracking-widest text-premium-muted justify-self-center">
              Subtotal
            </div>

          </div>


          {/* ================= CART ITEMS ================= */}
          <div className="divide-y divide-premium-border/40">

            {cart && cart.length > 0 &&
              cart.map((item, i) =>
                <ItemContent key={i} {...item} />
              )
            }

          </div>


          {/* ================= BOTTOM SECTION ================= */}
          <div className="border-t border-premium-border bg-premium-card p-6">

            <div className="flex flex-col items-stretch justify-between gap-8 lg:flex-row lg:items-start">

              {/* Continue Shopping */}
              <div className="flex items-center">

                <Link
                  to="/products"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-premium-border
                    bg-premium-card
                    px-6
                    py-3.5
                    text-xs
                    font-bold
                    uppercase
                    tracking-widest
                    text-premium-text
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-premium-gold
                    hover:text-premium-gold
                  "
                >
                  <MdArrowBack
                    size={14}
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-x-1
                    "
                  />

                  <span>Continue Shopping</span>
                </Link>

              </div>


              {/* ================= ORDER SUMMARY (BUG 1 & 2 FIX) ================= */}
              <div
                className="
                  w-full
                  max-w-md
                  rounded-2xl
                  border
                  border-premium-border
                  bg-premium-card
                  p-6
                  shadow-sm
                "
              >

                {/* Summary Header */}
                <div className="mb-6 flex items-center justify-between">

                  <h2 className="text-xs font-bold uppercase tracking-wider text-premium-text">
                    Order Summary
                  </h2>

                  <span className="rounded-md border border-premium-border bg-premium-bg px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-premium-text">
                    {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
                  </span>

                </div>


                {/* Subtotal */}
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-premium-text">

                  <span>Subtotal</span>

                  <span className="text-lg font-bold text-premium-text">
                    {formatPrice(Number(newCart.totalPrice) || 0)}
                  </span>

                </div>


                {/* Divider */}
                <div className="my-5 border-t border-premium-border/60"></div>


                {/* Shipping Info */}
                <div className="mb-5 rounded-xl border border-premium-border/40 bg-premium-bg p-4 text-center">

                  <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed text-premium-muted">
                    Taxes & shipping calculated at checkout.
                  </p>

                </div>


                {/* Checkout Button (HIGH CONTRAST BUG 2 FIX) */}
                <Link
                  to="/checkout"
                  className="block w-full"
                >
                  <button
                    className="
                      group
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10]
                      px-5
                      py-3.5
                      text-xs
                      font-bold
                      uppercase
                      tracking-widest
                      shadow-md
                      transition-all
                      duration-300
                      hover:bg-premium-gold
                      hover:text-[#1A1A1A]
                      dark:hover:bg-premium-gold-light
                      active:translate-y-0
                      focus:outline-none
                      cursor-pointer
                    "
                  >

                    <MdShoppingCart
                      size={15}
                      className="
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      "
                    />

                    <span>
                      Proceed to Checkout
                    </span>

                    <span
                      className="
                        text-xs
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    >
                      →
                    </span>

                  </button>
                </Link>


                {/* Secure Checkout */}
                <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-premium-muted">

                  <MdLockOutline size={14} />

                  <span>Secure Checkout</span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Cart