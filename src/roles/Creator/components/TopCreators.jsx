import Line from "../../components/Line";

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
    <div className="flex flex-col gap-[20px] rounded-[8px] p-[30px] border-[1px] border-light-border">
      <h1 className="text-[23px] font-medium">Top Creators</h1>

      <Line />

      {creators.map((creator, i) => (
        <div key={i} className="flex items-center justify-between">
          <p>{creator.name}</p>
          <p
            className={
              findColor(creator.rating) +
              " text-[#fff] w-fit text-[14px] py-[2px] px-[6px] rounded-[6px]"
            }
          >
            {creator.rating} Star
          </p>
        </div>
      ))}
    </div>
  );
}
