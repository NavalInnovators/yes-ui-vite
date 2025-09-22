export default function DraftHoverInfo({ message }) {
  return (
    <div className="absolute top-[45px] right-[-20px] info-tooltip w-[290px] py-[5px] px-[10px] shadow-[0px_0px_3px_1px_rgba(0,_0,_0,_0.1)] rounded-[7px]">
      {message}
    </div>
  );
}
