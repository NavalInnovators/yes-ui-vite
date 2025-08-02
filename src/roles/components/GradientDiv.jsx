export default function GradientDiv({ children }) {
  return (
    <div className="flex justify-between items-center py-[20px] px-[30px] bg-gradient-to-r from-[#381AB2] via-[#9B32AD] to-[#FEAC2F] text-[#fff]">
      {children}
    </div>
  );
}
