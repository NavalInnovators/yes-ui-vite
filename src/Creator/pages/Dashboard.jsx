import CreatorAnalytics from "../components/CreatorAnalytics";
import TotalEarning from "../components/TotalEarning";

export default function Dashboard() {
  return (
    <div className="p-[30px] flex gap-[20px]">
      <CreatorAnalytics />
      <TotalEarning />
    </div>
  );
}
