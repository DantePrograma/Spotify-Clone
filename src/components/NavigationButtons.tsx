import { useLocation, useNavigate } from "react-router-dom";

export const NavigationButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  return (
    <div className="flex gap-2">
      <button
        className="rounded-full h-9 w-9 grid place-items-center text-slate-300 bg-[#121212] disabled:bg-zinc-900/70"
        onClick={goBack}
        disabled={location.pathname === "/"}
      >
        <svg
          fill="currentColor"
          data-encore-id="icon"
          height={14}
          width={14}
          role="img"
          aria-hidden="true"
          viewBox="0 0 16 16"
        >
          <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path>
        </svg>
      </button>

      <button
        className="rounded-full h-9 w-9 grid place-items-center text-slate-300 bg-[#121212] disabled:bg-zinc-900/70"
        onClick={goForward}
        disabled={location.pathname.startsWith("/playlist")}
      >
        <svg
          fill="currentColor"
          data-encore-id="icon"
          role="img"
          aria-hidden="true"
          height={16}
          width={16}
          viewBox="0 0 16 16"
        >
          <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z"></path>
        </svg>
      </button>
    </div>
  );
};
