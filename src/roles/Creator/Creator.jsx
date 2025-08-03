import NavigationBar from "../Reviewer/components/NavigationBar";
import SideBar from "./components/sidebar/SideBar";
import CreatorMain from "./components/CreatorMain";
import GradientDiv from "../components/GradientDiv";

function TopGradientBar() {
  return (
    <GradientDiv>
      <h1 className="text-[25px]">Creator Mode</h1>
    </GradientDiv>
  );
}

export default function Creator() {
  return (
    <div className="h-screen flex flex-col">
      <NavigationBar />
      <TopGradientBar />

      <div className="flex overflow-hidden">
        <SideBar />
        <CreatorMain />
      </div>
    </div>
  );
}
