function findColor(rating) {
  let color;
  switch (Math.round(rating)) {
    case 1:
      color = "bg-green-500";
      break;
    case 2:
      color = "bg-blue-600";
      break;
    case 3:
      color = "bg-purple-800";
      break;
    case 4:
      color = "bg-[hsl(322,61%,62%)]";
      break;
    case 5:
      color = "bg-yellow-500";
      break;
  }

  return color;
}

export default function TopCreators() {
  const creators = [
    { name: "Shishir Dwiwedi", rating: 5 },
    { name: "Sachin Sharma", rating: 4 },
    { name: "Raghav Singh", rating: 3 },
    { name: "John Doe", rating: 2 },
    { name: "Alice", rating: 1 },
  ];

  return (
    <div className="flex flex-col gap-[15px] rounded-[8px] p-[20px] border-[1px] border-light-border dark:border-dark-border dark:bg-dark-card dark:text-white">
      <h1 className="text-[16px] font-medium border-b border-light-border dark:border-dark-border pb-[15px]">Top Creators</h1>

      <div>
        {creators.map((creator, i) => (
          <div key={i} className="flex items-center justify-between mb-[10px] last:mb-0">
            <p className="text-[13px]">{creator.name}</p>
            <p
              className={
                findColor(creator.rating) +
                " text-[#fff] w-fit text-[12px] py-[2px] px-[6px] rounded-[6px]"
              }
            >
              {creator.rating} Star
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
