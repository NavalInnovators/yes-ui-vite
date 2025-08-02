import { Info } from "lucide-react";

export default function InfoLabel({ value }) {
  return (
    <div className="flex w-fit items-center dark:bg-dark-more-highlighted dark:text-dark-text-muted relative justify-center gap-[5px] font-light bg-[rgba(230,230,230,1)] text-[14px] px-[15px] py-[4px] rounded-[10px]">
      <p>{value}/3</p>
      <Info size={15} />
    </div>
  );
}
