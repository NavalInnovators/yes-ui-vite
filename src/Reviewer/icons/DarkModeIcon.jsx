export default function DarkModeIcon() {
  function handleDarkMode() {
    const darkDiv = document.getElementById("needs-dark-mode");
    darkDiv.classList.toggle("dark");
  }

  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
      onClick={handleDarkMode}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.1538 11.7302C15.4099 12.1577 11.6923 16.1447 11.6923 21C11.6923 25.8552 15.4099 29.8422 20.1538 30.2698V11.7302ZM10 21C10 14.9249 14.9249 10 21 10C27.0752 10 32 14.9249 32 21C32 27.0752 27.0752 32 21 32C14.9249 32 10 27.0752 10 21Z"
        fill="currentColor"
      />
    </svg>
  );
}
