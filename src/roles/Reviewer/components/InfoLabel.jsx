import { Info } from "lucide-react";
import { useState } from "react";
import HoverInfo from "./sidebar-pages/new_qna_componennts/view_qna_components/HoverInfo";

export default function InfoLabel({ value }) {
  const [openToolTip, setOpenToolTip] = useState(false);

  function handleHover() {
    setOpenToolTip(true);
  }

  function handleHoverGone() {
    setOpenToolTip(false);
  }

  return (
    <div className="flex w-fit items-center dark:bg-dark-more-highlighted dark:text-dark-text-muted relative justify-center gap-[5px] font-light bg-[rgba(230,230,230,1)] text-xs px-[7px] py-[2px] rounded-[6px]">
      <p>{value}/3</p>
      <Info 
        size={12} 
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverGone}
        className="cursor-pointer"
      />
      {openToolTip && <HoverInfo />}
    </div>
  );
}
