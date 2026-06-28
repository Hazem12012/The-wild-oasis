import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

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

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const queryClient = useQueryClient();

  const {
    data: { data: cabins, count } = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cabins", filter, sort, page],
    queryFn: () => getCabins({ filter, sort, page }),
  });

  // PRE-FETCHING CABINS
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", filter, sort, page + 1],
      queryFn: () => getCabins({ filter, sort, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", filter, sort, page - 1],
      queryFn: () => getCabins({ filter, sort, page: page - 1 }),
    });
  }

  return { cabins, isLoading, isError, error, count };
}
