import React, { useState, useEffect, useMemo } from "react";
import { FiArrowUp, FiArrowDown, FiRefreshCcw, FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import api from "../../api/api";

const Filter = ({ disabled = false }) => {
  const { products } = useSelector((state) => state.products || {});
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategoryFromUrl = searchParams.get("category") || "all";

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [apiCategories, setApiCategories] = useState([]);

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortOrder") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  // Fetch categories from backend
  useEffect(() => {
    let mounted = true;
    api
      .get("/public/categories")
      .then((res) => {
        if (!mounted) return;
        const list = (res?.data?.content || []).map((c) => ({
          value: String(c.categoryName).trim(),
          label: String(c.categoryName).trim(),
          id: c.categoryId,
        }));
        setApiCategories(list);
      })
      .catch(() => {});
    return () => (mounted = false);
  }, []);

  const { categories, nameToIdMap } = useMemo(() => {
    const baseCategories = [{ value: "all", label: "All" }];

    const apiList = Array.isArray(apiCategories)
      ? apiCategories.map((c) => ({ value: c.value, label: c.label, id: c.id }))
      : [];

    const nameToId = new Map();
    (apiList || []).forEach((c) => {
      if (c && c.value) {
        const lower = String(c.value).trim().toLowerCase();
        if (!nameToId.has(lower) && c.id != null) nameToId.set(lower, c.id);
      }
    });

    const categoriesList = [...baseCategories, ...apiList];

    const seen = new Set();
    const unique = [];
    for (const it of categoriesList) {
      const key = String((it && it.value) || "")
        .trim()
        .toLowerCase();
      if (!key) continue;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(it);
      }
    }

    return { categories: unique, nameToIdMap: Object.fromEntries(nameToId) };
  }, [products, apiCategories, currentCategoryFromUrl]);

  useEffect(() => {
    const lookup = (categories || []).map((c) =>
      String(c.value).trim().toLowerCase(),
    );
    const cur = String(currentCategoryFromUrl || "")
      .trim()
      .toLowerCase();
    if (cur && cur !== "all" && !lookup.includes(cur)) {
      const p = new URLSearchParams(searchParams);
      p.delete("category");
      p.delete("categoryId");
      setSearchParams(p);
    }
  }, [categories, currentCategoryFromUrl, searchParams, setSearchParams]);

  const safeCategories = useMemo(() => {
    if (!Array.isArray(categories)) return [];
    return categories
      .map((it, idx) => {
        const rawValue = (it && (it.value ?? it.label)) || "";
        const rawLabel = (it && (it.label ?? it.value)) || "";
        const value = String(rawValue).trim() || `option-${idx}`;
        const label = String(rawLabel).trim() || value;
        return { value, label };
      })
      .filter((c) => c.label.length > 0);
  }, [categories]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm && searchTerm.trim() !== "") {
        params.set("keyword", searchTerm.trim());
      } else {
        params.delete("keyword");
      }
      setSearchParams(params);
    }, 700);
    return () => clearTimeout(handler);
  }, [searchTerm, searchParams, setSearchParams]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    const params = new URLSearchParams(searchParams);

    if (selectedCategory === "all") {
      params.delete("category");
      params.delete("categoryId");
    } else {
      params.set("category", selectedCategory);
      const lookupKey = String(selectedCategory).trim().toLowerCase();
      const id = nameToIdMap ? nameToIdMap[lookupKey] : undefined;
      if (id !== undefined && id !== null && id !== "") {
        params.set("categoryId", String(id));
      } else {
        params.delete("categoryId");
      }
    }

    setSearchParams(params);
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value || "");

  const toggleSortOrder = () => {
    const next = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(next);
    const params = new URLSearchParams(searchParams);
    params.set("sortOrder", next);
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setCategory("all");
    setSearchTerm("");
    setSortOrder("asc");
    setSearchParams({});
  };

  return (
    <div className={`w-full transition-opacity duration-300 ${disabled ? "opacity-35 pointer-events-none select-none" : ""}`}>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 border-b border-premium-border/60 pb-8">
        {/* Search Bar */}
        <div className="min-w-0 flex-1">
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-premium-gold" size={16} />
            <input
              value={searchTerm}
              disabled={disabled}
              onChange={handleSearchChange}
              type="text"
              placeholder={disabled ? "Catalog search unavailable while offline" : "Search our luxury collection..."}
              className="w-full rounded-xl border border-premium-border bg-premium-card px-4 py-2.5 pl-11 text-xs font-medium uppercase tracking-wider text-premium-text placeholder:text-premium-muted focus:border-premium-gold focus:ring-1 focus:ring-premium-gold outline-none transition-all duration-200 disabled:cursor-not-allowed shadow-xs"
            />
          </div>
        </div>

        {/* Category & Sorting Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-end">
          <div className="w-full sm:w-48 relative">
            <select
              value={category}
              disabled={disabled}
              onChange={handleCategoryChange}
              className="w-full rounded-xl border border-premium-border bg-premium-card px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-premium-text outline-none focus:border-premium-gold cursor-pointer appearance-none pr-8 disabled:cursor-not-allowed shadow-xs"
            >
              {safeCategories.map((item, idx) => (
                <option value={item.value} key={`cat-${idx}-${item.value}`} className="bg-premium-card text-premium-text">
                  {item.label === "All" ? "ALL CATEGORIES" : item.label.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Price */}
          <Tooltip title={disabled ? "" : `Sorted by Price: ${sortOrder}`}>
            <button
              onClick={toggleSortOrder}
              disabled={disabled}
              className="flex items-center justify-center gap-1.5 h-[40px] bg-[#1A1A1A] text-white dark:bg-premium-gold dark:text-[#0E0E10] px-5 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-premium-gold hover:text-[#1A1A1A] dark:hover:bg-premium-gold-light active:scale-98 shadow-sm transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Price</span>
              {sortOrder === "asc" ? (
                <FiArrowUp size={14} />
              ) : (
                <FiArrowDown size={14} />
              )}
            </button>
          </Tooltip>

          {/* Clear Filters Button */}
          <button
            onClick={handleClearFilters}
            disabled={disabled}
            className="flex items-center justify-center gap-1.5 h-[40px] border border-premium-border bg-premium-card px-5 text-xs font-bold uppercase tracking-wider text-premium-muted rounded-xl hover:border-premium-gold hover:text-premium-gold active:scale-98 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed shadow-xs"
          >
            <FiRefreshCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
