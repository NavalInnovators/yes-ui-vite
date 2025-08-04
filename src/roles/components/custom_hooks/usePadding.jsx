import useSmallScreen from "./useSmallScreen";

// This hook returns different margin and padding values for small and large screens
export default function usePadding(equal = false) {
  const isSmallScreen = useSmallScreen();

  const smallP = "px-[15px] py-[10px]";
  const largeP = "px-[25px] py-[20px]";

  const smallPEqual = "p-[10px]";
  const largePEqual = "p-[20px]";

  // Return the margin and padding based on screen size
  if (equal) {
    return isSmallScreen ? smallPEqual : largePEqual;
  } else {
    return isSmallScreen ? smallP : largeP;
  }
}
