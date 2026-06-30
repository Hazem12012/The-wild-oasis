import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const quaryClient = useQueryClient();

  const navigate = useNavigate();
  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingAPI,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      quaryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/booking");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteBooking };
}
