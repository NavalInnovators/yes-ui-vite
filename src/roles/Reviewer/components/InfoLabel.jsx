import { Info } from "lucide-react";

export default function InfoLabel({ value }) {
  return (
    <div className="flex w-fit items-center dark:bg-dark-more-highlighted dark:text-dark-text-muted relative justify-center gap-[5px] font-light bg-[rgba(230,230,230,1)] text-xs px-[7px] py-[2px] rounded-[6px]">
      <p>{value}/3</p>
      <Info size={12} />
    </div>
  );
}
