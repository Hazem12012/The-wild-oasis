import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const queryClient = useQueryClient();
const navigate = useNavigate()
  const { mutate: checkIn, isPending } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      navigate("/booking?status=checked-in");
      queryClient.invalidateQueries("bookings", { active: true });
    },
    onError: () => {
      toast.error("There was an error checking in the booking");
    },
  });

  return { checkIn, isPending };
}
  