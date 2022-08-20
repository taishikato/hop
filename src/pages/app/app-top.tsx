import { createEffect, createSignal } from "solid-js";
import { IoClose, IoHeart } from "solid-icons/io";
import { css, cx } from "@emotion/css";
import supabase from "../../supabaseClient";
import createLoginStatus from "../../store/createLoginStatus";
import createJobPosts from "../../store/createJobPosts";
import { VStack, SkeletonCircle, SkeletonText } from "@hope-ui/solid";
import type { JobPosts } from "../../types/JobPosts";
import createLoginModalStatus from "../../store/createLoginModalStatus";

const AppTop = () => {
  // window.addEventListener("keydown", (e) => {
  //   if (e.key === "ArrowRight") {
  //     setId(Math.floor(Math.random() * 10) + 1);
  //   } else if (e.key === "ArrowLeft") {
  //     setId(Math.floor(Math.random() * 10) + 1);
  //   }
  // });

  const { isLogin } = createLoginStatus;
  const { jobPosts, setJobPosts } = createJobPosts;
  const { onOpen } = createLoginModalStatus;

  const [post, setPost] = createSignal<JobPosts | Record<string, never>>({});
  const [skills, setSkills] = createSignal<string[]>([]);

  createEffect(async () => {
    const authUser = supabase.auth.user();

    // Call API immediately and end the process if the user is not logged in
    if (authUser == null) {
      const dummySkills = ["javascript", "react"];

      const { data, error }: { data: { posts: JobPosts[] }; error: any } =
        await supabase.functions.invoke("startupjob-api", {
          body: JSON.stringify({ tags: dummySkills }),
        });

      setSkills(dummySkills);
      setJobPosts(data.posts.map((p) => ({ isDone: false, post: p })));

      return;
    }

    if (jobPosts().length > 0) return;

    const { data: userData } = await supabase
      .from("users")
      .select()
      .eq("id", authUser.id)
      .single();

    let requestSkills = [];
    userData.skills.forEach((s) => {
      // some keywords don't work on Startupjobs
      if (s === "next" || s === "typescript") return;

      requestSkills.push(s);
    });

    setSkills(requestSkills);

    const { data, error }: { data: { posts: JobPosts[] }; error: any } =
      await supabase.functions.invoke("startupjob-api", {
        body: JSON.stringify({ tags: requestSkills }),
      });

    setJobPosts(data.posts.map((p) => ({ isDone: false, post: p })));
  });

  createEffect(() => {
    if (jobPosts().length === 0) return;

    setPost(jobPosts()[0].post);
  });

  const handleFavorite = async (
    e: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) => {
    e.preventDefault();

    const currentIndex = jobPosts().findIndex((p) => p.post.id === post().id);

    setJobPosts((prev) => {
      const clone = [...prev];

      clone[currentIndex].isDone = true;
      return clone;
    });

    if (currentIndex === 9) {
      const { data, error }: { data: { posts: JobPosts[] }; error: any } =
        await supabase.functions.invoke("startupjob-api", {
          body: JSON.stringify({ tags: skills() }),
        });

      setJobPosts(data.posts.map((p) => ({ isDone: false, post: p })));
      setPost(jobPosts()[0].post);
      return;
    }

    const nextPost = jobPosts()[currentIndex + 1];

    console.log(jobPosts());

    setPost(nextPost.post);
  };

  return (
    <>
      {!isLogin() && (
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
      )}
      <div class="w-full flex items-center justify-center gap-x-10">
        <div class="p-5 rounded-full bg-slate-400">
          <IoClose size={24} color="#000000" />
        </div>
        <div class="rounded-lg border border-slate-800 w-[700px]">
          {Object.keys(post()).length > 0 ? (
            <div class="flex-1 p-3">
              {post().company?.logo_url && (
                <div
                  class={cx([
                    "h-[200px] bg-auto bg-no-repeat rounded-t-lg bg-center",
                    css({
                      backgroundImage: `url('${post().company.logo_url}')`,
                    }),
                  ])}
                />
              )}
              <div class="text-4xl font-black text-center mt-3">
                {post().company?.name}
              </div>
              <h2 class="text-2xl font-bold text-center mb-3 mt-5">
                {post().title}
              </h2>
              {/* <div class="text-center space-y-3 mb-8">
              <h3 class="text-lg font-bold">Salary</h3>
              <div class="badge badge-primary p-3">$110k - 140k</div>
            </div> */}
              {post().city && (
                <div class="text-center space-y-3 mb-8">
                  <h3 class="text-lg font-bold">Location</h3>
                  <div class="p-3">{post().city}</div>
                </div>
              )}
              <div class="text-center space-y-3 mb-8">
                <h3 class="text-lg font-bold">Required Skills</h3>
                <div class="flex gap-3 justify-center">
                  {post().tags?.map((skill) => {
                    return <div>{skill}</div>;
                  })}
                </div>
              </div>
              <div
                class={cx([
                  "divider",
                  css({
                    "&:before, &:after": {
                      backgroundColor: "rgb(30 41 59)",
                    },
                  }),
                ])}
              />
              <div class="text-center my-8">
                <a
                  class="btn btn-primary rounded-full"
                  target="_blank"
                  href={post().url}
                >
                  See the detail
                </a>
                {/* <h3 class="text-lg font-bold">About this position</h3>
              <div>
                Zapier’s on a mission to make everyone more productive at work.
                As we continue to scale our mission to democratize automation,
                we’re hiring Frontend Engineers across the organization. Zapier
                has helped millions of people build businesses through the power
                of automation. Here is the team you might join: Billing team.
                The Billing Team strives to make it incredibly easy to purchase
                Zapier across the globe. Join us as we build systems that power
                purchasing, subscription management, and customer support.
                You’ll be part of our team focused on making it easier for our
                largest customers to buy Zapier. We practice...
              </div> */}
              </div>
            </div>
          ) : (
            <VStack alignItems="stretch" spacing="$2" class="p-8">
              <SkeletonCircle size="$10" />
              <SkeletonText mt="$4" noOfLines={4} spacing="$4" />
              <SkeletonText mt="$4" noOfLines={4} spacing="$4" />
              <SkeletonText mt="$4" noOfLines={4} spacing="$4" />
            </VStack>
          )}
        </div>
        <button
          class="p-5 rounded-full bg-pink-500 flex items-center gap-x-3 focus:outline-none hover:bg-pink-600"
          onClick={(e) => handleFavorite(e)}
        >
          <IoHeart size={24} color="#ffffff" />
        </button>
      </div>
    </>
  );
};

export default AppTop;
