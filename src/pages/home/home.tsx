import { Link } from "@solidjs/router";

const home = () => {
  return (
    <div class="flex justify-center mt-12">
      <Link href="/app" class="btn btn-secondary">
        See the jobs
      </Link>
    </div>
  );
};

export default home;
