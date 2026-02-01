import { useNavigate } from "react-router-dom";
import Badge from "../common/bagde";
import Button from "../common/button";

type Item = {
  id: number;
  name: string;
  category: string;
  daysUnclaimed: number;
  status: "approved" | "pending" | "blocked";
};

type SaleEligibleTableProps = {
  items: Item[];
};

export default function SaleEligibleTable({
  items,
}: SaleEligibleTableProps) {
  const navigate = useNavigate();

  return (
    <div className="mt-6 bg-white rounded-lg shadow border">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Days Unclaimed</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3">{item.daysUnclaimed}</td>
              <td className="p-3">
                <Badge
                  text={item.status.toUpperCase()}
                  status={item.status}
                />
              </td>
              <td className="p-3">
                <Button
  variant="secondary"
  onClick={() => navigate(`/admin/review/${item.id}`)}
  disabled={item.status === "blocked"}
>
  Review
</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
