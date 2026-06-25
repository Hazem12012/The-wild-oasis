import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useGetBookings() {
  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  return { bookings, isLoading, isError, error };
}
