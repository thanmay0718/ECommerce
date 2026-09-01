import React, { useMemo, useEffect } from "react";
import ProductCard from "./shared/ProductCard";
import { FaExclamationTriangle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Filter from "./products/Filter";
import useProductFilter from "../hooks/useProductFilter";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../store/actions";
import Loader from "./shared/Loader";
import Paginations from "./shared/Paginations";
import truncateText from "../utils/truncateText";

const Products = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const { products, categories, pagination } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    console.log(
      "Products component: products length =",
      Array.isArray(products) ? products.length : products,
    );

    if (Array.isArray(products))
      console.log(
        "Products sample:",
        products.slice(0, 5).map((p) => p.productName),
      );
  }, [products]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useProductFilter();

  const [searchParams] = useSearchParams();

  const sortOrder = searchParams.get("sortOrder") || "asc";
  const selectedCategory = searchParams.get("category") || "all";

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const PAGE_SIZE = 5;

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategory === "all") return products;

    const productsHaveCategoryMeta = products.some((p) =>
      Boolean(
        p &&
          (p.category ||
            p.categoryName ||
            p.category_id ||
            p.categoryId),
      ),
    );

    if (!productsHaveCategoryMeta) return products;

    const normalizeCategoryValue = (value) => {
      if (value === null || value === undefined) return null;

      if (typeof value === "object") {
        return (
          value.name ??
          value.title ??
          value.categoryName ??
          value.label ??
          value.value ??
          value.id ??
          value.category_id ??
          null
        );
      }

      return String(value).trim();
    };

    const normalizedSelectedCategory = String(selectedCategory)
      .trim()
      .toLowerCase();

    return products.filter((product) => {
      const categoryCandidates = [
        normalizeCategoryValue(product.category),
        normalizeCategoryValue(product.categoryId),
        normalizeCategoryValue(product.category_id),
        normalizeCategoryValue(product.categoryName),
      ].filter(Boolean);

      return categoryCandidates.some(
        (candidate) =>
          String(candidate).trim().toLowerCase() ===
          normalizedSelectedCategory,
      );
    });
  }, [products, selectedCategory]);

  const sortedProducts = useMemo(() => {
    if (!filteredProducts) return [];

    return [...filteredProducts].sort((a, b) => {
      const aPrice = Number(a.price ?? 0);
      const bPrice = Number(b.price ?? 0);

      return sortOrder === "asc"
        ? aPrice - bPrice
        : bPrice - aPrice;
    });
  }, [filteredProducts, sortOrder]);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ================= PAGE HEADER ================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
                E-Shop Collection
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Products
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Explore our collection and find the products that fit
                your needs.
              </p>
            </div>

            {/* Product Count */}
            {!isLoading && !errorMessage && (
              <div className="flex items-center gap-3">

                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                  <p className="text-2xl font-bold leading-none text-slate-900">
                    {sortedProducts?.length || 0}
                  </p>

                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Products
                  </p>
                </div>

              </div>
            )}

          </div>

        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================= FILTER ================= */}
        <div className="mb-10 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                Filter & Sort
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Refine your product selection
              </p>
            </div>

          </div>

          <Filter categories={categories ? categories : []} />
        </div>

        {/* ================= CONTENT STATES ================= */}
        {isLoading ? (
          <div className="flex min-h-[500px] items-center justify-center rounded-xl border border-slate-200 bg-white">
            <Loader />
          </div>
        ) : errorMessage ? (
          <div className="flex min-h-[450px] items-center justify-center rounded-xl border border-red-100 bg-white px-6">

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                <FaExclamationTriangle className="text-xl text-red-500" />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-900">
                Something went wrong
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {errorMessage}
              </p>

            </div>

          </div>
        ) : (
          <div className="min-h-[700px]">

            {/* ================= PRODUCTS HEADER ================= */}
            <div className="mb-7 flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Browse Products
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Showing{" "}
                  <span className="font-medium text-slate-600">
                    {sortedProducts?.length || 0}
                  </span>{" "}
                  available products
                </p>
              </div>

              <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                {sortOrder === "asc"
                  ? "Price: Low to High"
                  : "Price: High to Low"}
              </div>

            </div>

            {/* ================= PRODUCT GRID ================= */}
            {sortedProducts && sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">

                {sortedProducts
                  .slice(
                    (currentPage - 1) * PAGE_SIZE,
                    currentPage * PAGE_SIZE,
                  )
                  .map((item, i) => (
                    <ProductCard
                      key={i}
                      {...item}
                    />
                  ))}

              </div>
            ) : (
              /* ================= EMPTY STATE ================= */
              <div className="flex min-h-[450px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white">

                <div className="px-6 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <span className="text-2xl text-slate-400">
                      ×
                    </span>
                  </div>

                  <h2 className="mt-5 text-lg font-semibold text-slate-900">
                    No products found
                  </h2>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    We couldn't find any products matching your current
                    filters. Try changing your category or sorting options.
                  </p>

                </div>

              </div>
            )}

            {/* ================= PAGINATION ================= */}
            {sortedProducts && sortedProducts.length > 0 && (
              <div className="mt-12 flex justify-center border-t border-slate-200 pt-8">

                <Paginations
                  numberOfPage={Math.max(
                    1,
                    Math.ceil(
                      (sortedProducts || []).length / PAGE_SIZE,
                    ),
                  )}
                  totalProducts={(sortedProducts || []).length}
                />

              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
};

export default Products;