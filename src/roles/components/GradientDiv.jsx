export default function GradientDiv({ children }) {
  return (
    <div className="flex justify-between items-center py-[20px] px-[30px] bg-[linear-gradient(90deg,rgba(56,26,178,1)_12%,rgba(155,50,173,1)_44%,rgba(254,172,47,1)_86%)] text-[#fff]">
      {children}
      <p>New Updates</p>
    </div>
  );
}
