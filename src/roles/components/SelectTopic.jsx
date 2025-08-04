import { use, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import useSmallScreen from "./custom_hooks/useSmallScreen";

export default function SelectTopic({
  options,
  filterByTopicName = () => {},
  selectedOption,
  setSelectedOption,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectTopicRef = useRef(null);
  const smallScreen = useSmallScreen();

  useEffect(() => {
    function handleOutsideClick(e) {
      if (!selectTopicRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  function Option({ value }) {
    return (
      <div
        className="px-[10px] py-[5px] hover:text-black dark:hover:text-white hover:bg-light-hover dark:hover:bg-dark-hover rounded-[6px]"
        onClick={(e) => handleSelectTopic(e, value)}
      >
        {value}
      </div>
    );
  }

  function handleSelectTopic(e, value) {
    e.stopPropagation();
    setSelectedOption(value);
    filterByTopicName(value);
    setIsOpen(false);
  }

  const largePadding = "py-[7px] px-[15px]";
  const smallPadding = "py-[5px] px-[10px]";

  const padding = smallScreen ? smallPadding : largePadding;
  const textSize = smallScreen ? "text-[12px]" : "text-[14px]";
  const minWidth = smallScreen ? "min-w-[105px]" : "min-w-[140px]";

  return (
    <div
      className={`${
        smallScreen ? "pr-[5px]" : "pr-[10px]"
      } dark:bg-dark-highlight relative flex flex-1 items-center transition-all bg-[rgba(230,230,230,1)] rounded-[5px] cursor-pointer justify-between`}
      onClick={() => setIsOpen((prev) => !prev)}
      ref={selectTopicRef}
    >
      <div
        className={`${padding} ${textSize} ${minWidth} select-none dark:bg-dark-highlight dark:text-white bg-[rgba(230,230,230,1)] outline-none rounded-[5px] border-none font-light placeholder:text-gray-800 text-black  cursor-pointer`}
      >
        {selectedOption}
      </div>

      <ChevronDown size={20} className="dark:text-white" />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.09, ease: "easeInOut" }}
            className="dark:bg-dark-highlight border-[1px] border-light-border dark:border-dark-border dark:text-dark-text-muted flex flex-col shadow-[0px_0px_3px_1px_rgba(0,_0,_0,_0.1)] text-gray-500 absolute top-[45px] font-light rounded-[6px] z-10 bg-[#f7f7f7] p-[4px] text-[13px]"
          >
            {options.map((option) => (
              <Option key={option} value={option} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
