import ProductCard from "../shared/ProductCard";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Filter from "./Filter";
import BackendOffline from "../shared/BackendOffline";
import { ShoppingBag } from "lucide-react";

import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";

import { fetchCategories } from "../../store/actions";

import Paginations from "../shared/Paginations";
import truncateText from "../../utils/truncateText";

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

  // This how we are having our filter category is having dynamic data from the backend,
  // so we need to fetch the categories from the backend and store it in the redux store.
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
  const PAGE_SIZE = 5; // show 5 products per page

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategory === "all") return products;

    // If server returned a filtered list but product objects do not include
    // any category metadata, trust the server response (do not apply
    // additional client-side filtering) because backend already filtered.
    const productsHaveCategoryMeta = products.some((p) =>
      Boolean(
        p && (p.category || p.categoryName || p.category_id || p.categoryId),
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
          String(candidate).trim().toLowerCase() === normalizedSelectedCategory,
      );
    });
  }, [products, selectedCategory]);

  const sortedProducts = useMemo(() => {
    if (!filteredProducts) return [];
    return [...filteredProducts].sort((a, b) => {
      const aPrice = Number(a.price ?? 0);
      const bPrice = Number(b.price ?? 0);
      return sortOrder === "asc" ? aPrice - bPrice : bPrice - aPrice;
    });
  }, [filteredProducts, sortOrder]);

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-10">
      <Filter categories={categories ? categories : []} disabled={Boolean(errorMessage)} />
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <BackendOffline
          errorMessage={errorMessage}
          onRetry={() => {
            dispatch(fetchCategories());
          }}
        />
      ) : (
        <div className="min-h-[600px] mt-10">
          <div className="flex flex-col items-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-premium-gold font-sans">
              Exquisite Selection
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-premium-text uppercase">
              All Products
            </h1>
            <div className="mt-3 h-0.5 w-12 bg-premium-gold/60" />
          </div>

          {!sortedProducts || sortedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-premium-border bg-white text-premium-muted shadow-sm mb-4">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wider text-premium-charcoal">
                No Products Available
              </h3>
              <p className="mt-2 text-xs text-premium-muted uppercase tracking-wider max-w-sm">
                No items match the selected criteria, or the product catalog is currently updating.
              </p>
            </div>
          ) : (
            <>
              <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-8">
                {sortedProducts
                  .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                  .map((item, i) => (
                    <ProductCard key={i} {...item} />
                  ))}
              </div>
              <div className="flex justify-center mt-12 pt-8 border-t border-premium-border/40">
                <Paginations
                  numberOfPage={Math.max(
                    1,
                    Math.ceil((sortedProducts || []).length / PAGE_SIZE),
                  )}
                  totalProducts={(sortedProducts || []).length}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default Products;