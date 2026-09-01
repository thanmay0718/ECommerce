import React from "react";
import { Pagination } from "@mui/material";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

const Paginations = ({ numberOfPage }) => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const params = new URLSearchParams(searchParams);

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const onChangeHandler = (event, value) => {
    params.set("page", value.toString());
    navigate(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex w-full items-center justify-center py-10">
      <Pagination
        count={numberOfPage}
        page={currentPage}
        siblingCount={1}
        boundaryCount={1}
        shape="rounded"
        onChange={onChangeHandler}
        sx={{
          "& .MuiPagination-ul": {
            gap: "6px",
          },

          /* All buttons */
          "& .MuiPaginationItem-root": {
            minWidth: "40px",
            height: "40px",
            borderRadius: "6px",
            border: "1px solid #E8E6E3",
            backgroundColor: "#FAFAF9",
            color: "#1A1A1A",
            fontSize: "13px",
            fontWeight: 500,
            fontFamily: "Arial, sans-serif",
            transition: "all 0.2s ease-in-out",
          },

          /* Hover */
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#F7F6F4",
            borderColor: "#C9A961",
            color: "#1A1A1A",
          },

          /* Active page */
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#1A1A1A",
            color: "#FFFFFF",
            borderColor: "#1A1A1A",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(26, 26, 26, 0.08)",
          },

          /* Active hover */
          "& .MuiPaginationItem-root.Mui-selected:hover": {
            backgroundColor: "#2A2A2A",
          },

          /* Previous / Next */
          "& .MuiPaginationItem-previousNext": {
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
          },

          /* Disabled */
          "& .MuiPaginationItem-root.Mui-disabled": {
            opacity: 0.35,
            backgroundColor: "#FAFAF9",
            borderColor: "#E8E6E3",
          },

          /* Ellipsis */
          "& .MuiPaginationItem-ellipsis": {
            border: "none",
            backgroundColor: "transparent",
            color: "#6B6B6B",
          },
        }}
      />
    </div>
  );
};

export default Paginations;