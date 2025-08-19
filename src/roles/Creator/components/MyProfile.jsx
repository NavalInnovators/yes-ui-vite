import ProfileImage from "../../components/ProfileImage";

export default function MyProfile() {
  return (
    <div className="rounded-[8px] p-[20px] border-[1px] border-light-border dark:border-dark-border dark:bg-dark-card dark:text-white flex items-center gap-[15px]">
      <ProfileImage size={100} />

      <div className="flex flex-col gap-[8px]">
        <div>
          <p className="text-[16px] font-medium">User Name</p>
          <p className="text-[hsl(0,0%,50%)] dark:text-dark-text-muted font-light text-[13px]">Your Profile</p>
        </div>
        <p className="bg-purple-800 text-[#fff] text-[12px] font-light w-fit py-[2px] px-[6px] rounded-[6px]">
          3.5 Star
        </p>
      </div>
    </div>
  );
}
