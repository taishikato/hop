import createLoginModalStatus from "../../../store/createLoginModalStatus";

const NoLoggedInUser = () => {
  const { onOpen } = createLoginModalStatus;

  return (
    <div class="alert shadow-lg w-[700px] mx-auto">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-info flex-shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>
          Hop is showing you a random job post since you are not logged in
        </span>
      </div>
      <div class="flex-none">
        <button
          class="btn btn-sm btn-primary focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            onOpen();
          }}
        >
          Login / Sign up
        </button>
      </div>
    </div>
  );
};

export default NoLoggedInUser;
