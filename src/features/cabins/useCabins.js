import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

export function useCabins() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("discount") || "all";
  const modifier = filterValue === "all" ? null : 0;

  const filter =
    filterValue === "all"
      ? null
      : {
          field: "discount",
          value: modifier,
          method: filterValue === "no-discount" ? "eq" : "neq",
        };

  // SORT
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const sort = { field, direction, method: "order" };

  const {
    data: cabins,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cabins", filter, sort],
    queryFn: () => getCabins({ filter, sort }),
  });
  return { cabins, isLoading, isError, error };
}
