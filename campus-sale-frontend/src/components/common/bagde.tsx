type BadgeProps = {
  text: string;
  status?: "approved" | "pending" | "blocked";
};

export default function Badge({
  text,
  status = "pending",
}: BadgeProps) {
  const styles = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    blocked: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {text}
    </span>
  );
}
