import React from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/actions";

const useProductFilter = () => {
  const [searchParams] = useSearchParams(); // for future use if needed, provides access to the URL's query parameters, which can be useful for implementing features like deep linking or preserving filter state in the URL.
  const dispatch = useDispatch(); // for future use if needed, allows you to dispatch actions to the Redux store, which can be useful for updating the global state based on filter changes or search results.

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("page", currentPage - 1); // Ensure the page parameter is always set, defaulting to 1 if not present

    const sortOrder = searchParams.get("sortOrder") || "asc";
    const categoryParams = searchParams.get("category") || null;
    const categoryIdParams = searchParams.get("categoryId") || null;
    const keyword = searchParams.get("keyword") || null;
    params.set("sortBy", "price");
    params.set("sortOrder", sortOrder);

    if (categoryParams) {
      params.set("category", categoryParams);
    }

    if (categoryIdParams) {
      params.set("categoryId", categoryIdParams);
    }

    if (keyword) {
      params.set("keyword", keyword);
    }

    const queryString = params.toString();
    console.log(
      "useProductFilter: category=",
      categoryParams,
      "categoryId=",
      categoryIdParams,
    );
    console.log("Constructed Query String:", queryString); // Debugging log to verify the constructed query string
    dispatch(fetchProducts(queryString)); // dispatches the fetchProducts action with the constructed query string
  }, [searchParams, dispatch]); // for future use if needed, ensures that the effect runs whenever the search parameters or dispatch function changes, allowing you to react to changes in the URL or update the state accordingly.

  return;
};

export default useProductFilter;
