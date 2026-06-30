import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkOut, isPending } = useMutation({
    mutationFn: ({ bookingId }) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      navigate("/booking?status=checked-out");
      queryClient.invalidateQueries("bookings", { active: true });
    },
    onError: () => {
      toast.error("There was an error checking out the booking");
    },
  });

  return { checkOut, isPending };
}
