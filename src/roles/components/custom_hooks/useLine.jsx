import useSmallScreen from "./useSmallScreen";

export default function useLine() {
  const smallScreen = useSmallScreen();

  const line =
    (smallScreen ? "pb-[10px]" : "pb-[15px]") +
    " border-b-[1px] border-light-border dark:border-dark-border";

  return line;
}
