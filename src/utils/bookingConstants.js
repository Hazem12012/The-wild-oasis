export const tableHeader = [
  { value: "cabin", label: "Cabin" },
  { value: "guest", label: "Guest" },
  { value: "dates", label: "Dates" },
  { value: "status", label: "Status" },
  { value: "amount", label: "Amount" },
  { value: "", label: "" },
];
export const filterOptions = [
  { value: "all", label: "All" },
  { value: "checked-out", label: "Checked out" },
  { value: "checked-in", label: "Checked in" },
  { value: "unconfirmed", label: "Unconfirmed" },
];

export const sortOptions = [
  { value: "startDate-desc", label: "Sort by date (recent first)" },
  { value: "startDate-asc", label: "Sort by date (earlier first)" },
  {
    value: "totalPrice-desc",
    label: "Sort by amount (high first)",
  },
  { value: "totalPrice-asc", label: "Sort by amount (low first)" },
];
