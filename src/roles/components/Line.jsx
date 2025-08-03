export default function Line({
  className,
  color = "dark:bg-dark-border bg-gray-300",
}) {
  return <div className={`${className} h-[1px] ${color}`}></div>;
}
