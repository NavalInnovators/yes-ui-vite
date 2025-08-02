import ProfileImage from "../../components/ProfileImage";

export default function MyProfile() {
  return (
    <div className="rounded-[8px] p-[30px] border-[1px] border-light-border flex items-center gap-[20px]">
      <ProfileImage size={"100px"} />

      <div className="flex flex-col gap-[10px]">
        <div>
          <p className="text-[20px]">User Name</p>
          <p className="text-[hsl(0,0%,50%)] font-light">Your Profile</p>
        </div>
        <p className="bg-purple-800 text-[#fff] text-[14px] font-light w-fit py-[2px] px-[8px] rounded-[6px]">
          3.5 Star
        </p>
      </div>
    </div>
  );
}
