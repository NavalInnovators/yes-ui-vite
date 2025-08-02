import NavigationBar from "../Reviewer/components/NavigationBar";
import SideBar from "../Reviewer/components/sidebar/SideBar";
import CreatorMain from "./components/CreatorMain";

function TopGradientBar() {
  return (
    <div className="flex justify-between items-center py-[20px] px-[30px] bg-gradient-to-r from-[#381AB2] via-[#9B32AD] to-[#FEAC2F] text-[#fff]">
      <h1 className="text-[30px]">Creator Mode</h1>
      <div
        // to="/new_qna"
        className="text-[18px] transition-transform cursor-pointer hover:scale-[1.1]"
      >
        Close
      </div>
    </div>
  );
}

export default function Creator() {
  return (
    <div>
      <NavigationBar />
      <TopGradientBar />

      <div className="flex">
        <SideBar />
        <CreatorMain />
      </div>
    </div>
  );
}
