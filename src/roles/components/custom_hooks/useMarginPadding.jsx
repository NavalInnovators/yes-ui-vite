import useSmallScreen from "./useSmallScreen";

// This hook returns different margin and padding values for small and large screens
export default function useMarginPadding(equal = false) {
  const isSmallScreen = useSmallScreen();

  const smallMP = "px-[15px] py-[10px]";
  const largeMP = "px-[25px] py-[20px]";

  const smallMPEqual = "p-[10px]";
  const largeMPEqual = "p-[20px]";

  // Return the margin and padding based on screen size
  if (equal) {
    return isSmallScreen ? smallMPEqual : largeMPEqual;
  } else {
    return isSmallScreen ? smallMP : largeMP;
  }
}
