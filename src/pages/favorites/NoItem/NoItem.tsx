import { Link } from "@solidjs/router";

const NoItem = () => {
  return (
    <div class="alert alert-info shadow-lg w-[90%] md:w-[700px] mx-auto">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-current flex-shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>No favorite job post added yet</span>
      </div>
      <div class="flex-none">
        <Link href="/app" class="btn btn-sm btn-primary">
          Explore the job posts
        </Link>
      </div>
    </div>
  );
};

export default NoItem;
