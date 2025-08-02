import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function SelectTopic({
  options,
  filterByTopicName = () => {},
  selectedOption,
  setSelectedOption,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectTopicRef = useRef(null);

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
        className="px-[15px] py-[5px] hover:text-black dark:hover:text-white hover:bg-light-hover dark:hover:bg-dark-hover rounded-[6px]"
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

  return (
    <div
      className="dark:bg-dark-highlight relative flex items-center transition-all bg-[rgba(230,230,230,1)] rounded-[5px] pr-[15px] cursor-pointer justify-between"
      onClick={() => setIsOpen((prev) => !prev)}
      ref={selectTopicRef}
    >
      <div className="select-none min-w-[200px] dark:bg-dark-highlight dark:text-white bg-[rgba(230,230,230,1)] outline-none rounded-[5px] border-none text-[16px] font-light placeholder:text-gray-800 text-black py-[9px] px-[15px] cursor-pointer">
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
            className="dark:bg-dark-highlight border-[1px] border-light-border dark:border-dark-border dark:text-dark-text-muted flex flex-col shadow-[0px_0px_3px_1px_rgba(0,_0,_0,_0.1)] text-gray-500 absolute top-[50px] font-light rounded-[6px] z-10 bg-[#f7f7f7] p-[5px]"
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
