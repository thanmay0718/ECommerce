import React, { useState } from "react";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import { toast } from "react-hot-toast";

const ProductCard = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  about = false,
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const btnLoader = false;
  const [selectedViewProduct, setSelectedViewProduct] = useState("");
  const isAvailable = quantity && Number(quantity) > 0;
  const dispatch = useDispatch();

  const handleOpenProductView = (product) => {
    if (!about) {
      setSelectedViewProduct(product);
      setOpenProductViewModal(true);
    }
  };

  const addToCartHandler = (cartItems) => {
    dispatch(addToCart(cartItems, 1, toast));
  };

  // Theme-aware image fallback with warm light ivory tint
  const handleImageError = (e) => {
    const isDark =
      document.documentElement.classList.contains("dark") ||
      document.documentElement.getAttribute("data-theme") === "dark";
    const bg = isDark ? "16161A" : "F5F4F0";
    const color = isDark ? "D4B46A" : "6B6B6B";
    const text = encodeURIComponent(productName || "Product Item");
    e.target.src = `https://placehold.co/600x400/${bg}/${color}?text=${text}`;
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-premium-border bg-premium-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium-hover">

      {/* PRODUCT IMAGE — Soft warm light off-white (#F5F4F0) in Light Mode, dark obsidian in Dark Mode */}
      <div
        onClick={() =>
          handleOpenProductView({
            id: productId,
            productName,
            image,
            description,
            quantity,
            price,
            discount,
            specialPrice,
            about,
          })
        }
        className="relative h-64 w-full cursor-pointer overflow-hidden bg-[#F5F4F0] dark:bg-[#1E1E24] border-b border-premium-border/40 flex items-center justify-center p-3"
      >
        <img
          src={image}
          alt={productName}
          className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 group-hover:scale-105"
          onError={handleImageError}
        />

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* STOCK STATUS — Simple direct colored text (NO box container) */}
        {!about && (
          <div className="absolute left-3.5 top-3.5 z-10">
            {isAvailable ? (
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                In Stock
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Out of Stock
              </span>
            )}
          </div>
        )}

        {/* DISCOUNT BADGE */}
        {!about && discount > 0 && (
          <div className="absolute right-3.5 top-3.5 z-10">
            <span className="rounded-md bg-premium-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#1A1A1A] shadow-sm font-sans">
              {discount}% OFF
            </span>
          </div>
        )}

        {/* QUICK VIEW BUTTON */}
        {!about && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10">
            <span className="flex items-center gap-2 rounded-md border border-premium-border bg-premium-card/95 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-premium-text shadow-lg backdrop-blur-md">
              <FaEye size={12} className="text-premium-gold" />
              Quick View
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-5">

        {/* NAME */}
        <h2
          onClick={() =>
            handleOpenProductView({
              id: productId,
              productName,
              image,
              description,
              quantity,
              price,
              discount,
              specialPrice,
              about,
            })
          }
          className={`line-clamp-1 text-base font-bold tracking-tight text-premium-text font-sans ${
            !about
              ? "cursor-pointer transition-colors hover:text-premium-gold"
              : ""
          }`}
          title={productName}
        >
          {productName}
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-2 min-h-[40px] text-xs leading-relaxed text-premium-muted line-clamp-2 font-sans">
          {truncateText(description, 85)}
        </p>

        {/* BOTTOM */}
        {!about && (
          <div className="mt-4 border-t border-premium-border/50 pt-4">

            <div className="flex items-center justify-between gap-3">

              {/* PRICE */}
              <div>
                {specialPrice ? (
                  <>
                    <p className="text-[10px] font-medium text-premium-muted line-through leading-none mb-1 font-sans">
                      ₹{Number(price.toFixed(2))}
                    </p>

                    <p className="text-base font-bold tracking-tight text-premium-text leading-none font-sans">
                      ₹{Number(specialPrice.toFixed(2))}
                    </p>
                  </>
                ) : (
                  <p className="text-base font-bold tracking-tight text-premium-text leading-none font-sans">
                    ₹{Number(price.toFixed(2))}
                  </p>
                )}
              </div>

              {/* ADD TO CART BUTTON */}
              <button
                disabled={!isAvailable || btnLoader}
                onClick={() =>
                  addToCartHandler({
                    productId,
                    productName,
                    description,
                    quantity,
                    image,
                    price,
                    specialPrice,
                  })
                }
                className={`flex h-9 items-center justify-center gap-1.5 rounded-lg px-4 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 shadow-sm ${
                  isAvailable
                    ? "cursor-pointer bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10] hover:bg-premium-gold hover:text-[#1A1A1A] dark:hover:bg-premium-gold-light active:scale-98"
                    : "cursor-not-allowed bg-premium-bg text-premium-muted border border-premium-border/60 opacity-50"
                }`}
              >
                <FaShoppingCart size={11} />

                <span>
                  {isAvailable ? "Add" : "OOS"}
                </span>
              </button>

            </div>
          </div>
        )}

        {/* ABOUT */}
        {about && (
          <div className="mt-4 border-t border-premium-border/50 pt-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-premium-gold font-sans">
              Featured Product
            </span>
          </div>
        )}

      </div>

      <ProductViewModal
        open={openProductViewModal}
        setOpen={setOpenProductViewModal}
        product={selectedViewProduct}
        isAvailable={isAvailable}
      />
    </div>
  );
};

export default ProductCard;