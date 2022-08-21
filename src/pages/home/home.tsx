import { Link } from "@solidjs/router";

const home = () => {
  return (
    <div class="mt-12 w-[700px] mx-auto text-center">
      <div class="text-5xl font-black text-center mb-7 bg-clip-text text-transparent bg-gradient-to-r from-pink-400  to-blue-400">
        {/* Your favorite app to find the best job  */}
        Let's find a partner of your life - a job that you love
      </div>
      <Link href="/app" class="btn btn-secondary mb-5">
        See the jobs
      </Link>
      <img src="/lp-sample.png" class="rounded-lg" />
    </div>
  );
};

export default home;
