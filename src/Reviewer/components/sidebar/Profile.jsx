export default function Profile() {
  return (
    <div className="flex flex-col items-center justify-center gap-[18px]">
      <img
        className="rounded-full w-[77px]"
        src="/pfp.jpg"
        alt="Profile Photo"
      />

      <div className="flex flex-col items-center justify-center">
        <p className="font-bold">User Name</p>
        <p className="dark:text-dark-text-muted text-gray-500 font-light text-[15px]">
          Role: Reviewer
        </p>
      </div>
    </div>
  );
}
