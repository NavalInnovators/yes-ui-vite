export default function ProfileImage({ size }) {
  return (
    <img
      style={{ width: size }}
      className="rounded-full"
      src="/pfp.jpg"
      alt="Profile Photo"
    />
  );
}
