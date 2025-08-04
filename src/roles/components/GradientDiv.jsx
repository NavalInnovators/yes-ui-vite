import usePadding from "../components/custom_hooks/usePadding";

export default function GradientDiv({ children }) {
  const padding = usePadding();

  return (
    <div
      className={`${padding} flex h-[63px] justify-between items-center bg-[linear-gradient(90deg,rgba(56,26,178,1)_12%,rgba(155,50,173,1)_44%,rgba(254,172,47,1)_86%)] text-[#fff]`}
    >
      {children}
    </div>
  );
}
