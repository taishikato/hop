import type { JobPosts } from "../../types/JobPosts";
import { createEffect, createSignal } from "solid-js";
import { IoClose, IoHeart } from "solid-icons/io";
import { css, cx } from "@emotion/css";
import { notificationService } from "@hope-ui/solid";
import supabase from "../../supabaseClient";
import createLoginStatus from "../../store/createLoginStatus";
import createJobPosts from "../../store/createJobPosts";
import createLoginModalStatus from "../../store/createLoginModalStatus";
import NoLoggedInUser from "./NoLoggedInUser/NoLoggedInUser";
import SkeletonPlaceholder from "./SkeletonPlaceholder/SkeletonPlaceholder";
import NoMoreJob from "./NoMoreJob/NoMoreJob";

const AppTop = () => {
  window.addEventListener("keydown", async (e) => {
    if (e.key === "ArrowRight") {
      await handleFavorite(e);
    } else if (e.key === "ArrowLeft") {
      await handlePass(e);
    }
  });

  const { isLogin } = createLoginStatus;
  const { jobPosts, setJobPosts } = createJobPosts;
  const { onOpen } = createLoginModalStatus;

  const [post, setPost] = createSignal<JobPosts | Record<string, never>>({});
  const [skills, setSkills] = createSignal<string[]>([]);
  const [noMoreJob, setNoMoreJob] = createSignal(false);

  createEffect(async () => {
    const authUser = supabase.auth.user();

    if (noMoreJob()) return;

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

    console.log("jobPosts", jobPosts());

    if (jobPosts().length > 0) {
      console.log("here?");

      return;
    }

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

    const [favoriteJobsRes, passedJobsRes] = await Promise.all([
      supabase
        .from("favorite_jobs")
        .select("startupjob_id")
        .eq("user_id", authUser.id),
      supabase
        .from("passed_jobs")
        .select("startupjob_id")
        .eq("user_id", authUser.id),
    ]);

    const favJobIds = new Set(favoriteJobsRes.data.map((d) => d.startupjob_id));
    const passedJobIds = new Set(
      passedJobsRes.data.map((d) => d.startupjob_id)
    );

    const filteredJobs = data.posts.filter(
      (p) => !favJobIds.has(p.id) && !passedJobIds.has(p.id)
    );

    if (filteredJobs.length === 0) {
      setNoMoreJob(true);
      return;
    }

    setJobPosts(filteredJobs.map((p) => ({ isDone: false, post: p })));
  });

  createEffect(() => {
    if (jobPosts().length === 0) return;

    setPost(jobPosts()[0].post);
  });

  const handleFavorite = async (
    e:
      | (MouseEvent & {
          currentTarget: HTMLButtonElement;
          target: Element;
        })
      | KeyboardEvent
  ) => {
    e.preventDefault();

    if (!isLogin()) {
      onOpen();

      return;
    }

    const postId = post().id;
    const currentIndex = jobPosts().findIndex((p) => p.post.id === postId);

    const authUser = supabase.auth.user();
    await supabase.from("favorite_jobs").insert({
      startupjob_id: postId,
      user_id: authUser.id,
    });

    setJobPosts((prev) => {
      const clone = [...prev];

      clone[currentIndex].isDone = true;
      return clone;
    });

    if (currentIndex === jobPosts().length - 1) {
      // const { data, error }: { data: { posts: JobPosts[] }; error: any } =
      //   await supabase.functions.invoke("startupjob-api", {
      //     body: JSON.stringify({ tags: skills() }),
      //   });

      // setJobPosts(data.posts.map((p) => ({ isDone: false, post: p })));
      // setPost(jobPosts()[0].post);
      setNoMoreJob(true);
      return;
    }

    const nextPost = jobPosts()[currentIndex + 1];

    setPost(nextPost.post);

    notificationService.show({
      status: "success",
      title: "Added to your favorite job list successfully",
      duration: 3000,
    });
  };

  const handlePass = async (
    e:
      | (MouseEvent & {
          currentTarget: HTMLButtonElement;
          target: Element;
        })
      | KeyboardEvent
  ) => {
    e.preventDefault();

    const postId = post().id;

    const authUser = supabase.auth.user();
    await supabase.from("passed_jobs").insert({
      startupjob_id: postId,
      user_id: authUser.id,
    });

    const currentIndex = jobPosts().findIndex((p) => p.post.id === postId);

    setJobPosts((prev) => {
      const clone = [...prev];

      clone[currentIndex].isDone = true;
      return clone;
    });

    if (currentIndex === jobPosts().length - 1) {
      // const { data, error }: { data: { posts: JobPosts[] }; error: any } =
      //   await supabase.functions.invoke("startupjob-api", {
      //     body: JSON.stringify({ tags: skills() }),
      //   });

      // setJobPosts(data.posts.map((p) => ({ isDone: false, post: p })));
      // setPost(jobPosts()[0].post);
      setNoMoreJob(true);
      return;
    }

    const nextPost = jobPosts()[currentIndex + 1];

    setPost(nextPost.post);

    notificationService.show({
      status: "success",
      title: "Passed",
      duration: 3000,
    });
  };

  return (
    <>
      {noMoreJob() && <NoMoreJob />}
      {!noMoreJob() && !isLogin() && <NoLoggedInUser />}
      {!noMoreJob() && Object.keys(post()).length > 0 && (
        <div class="w-full flex items-center justify-center gap-x-10">
          <button
            class="p-5 rounded-full bg-slate-400"
            onClick={(e) => handlePass(e)}
          >
            <IoClose size={24} color="#000000" />
          </button>
          <div class="rounded-lg border border-slate-800 w-[700px]">
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
          </div>
          <button
            class="p-5 rounded-full bg-pink-500 flex items-center gap-x-3 focus:outline-none hover:bg-pink-600"
            onClick={(e) => handleFavorite(e)}
          >
            <IoHeart size={24} color="#ffffff" />
          </button>
        </div>
      )}
      {!noMoreJob() && Object.keys(post()).length === 0 && (
        <SkeletonPlaceholder />
      )}
    </>
  );
};

export default AppTop;
