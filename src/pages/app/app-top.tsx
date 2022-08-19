import { createEffect, createSignal } from "solid-js";
import { IoMail, IoClose } from "solid-icons/io";
import { css, cx } from "@emotion/css";
import supabase from "../../supabaseClient";

const AppTop = () => {
  // window.addEventListener("keydown", (e) => {
  //   if (e.key === "ArrowRight") {
  //     setId(Math.floor(Math.random() * 10) + 1);
  //   } else if (e.key === "ArrowLeft") {
  //     setId(Math.floor(Math.random() * 10) + 1);
  //   }
  // });

  const [post, setPost] = createSignal({});

  createEffect(async () => {
    const authUser = supabase.auth.user();
    if (authUser == null) return;

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

    const { data, error } = await supabase.functions.invoke("startupjob-api", {
      body: JSON.stringify({ tags: requestSkills }),
    });

    console.log({ data });
    setPost(data.posts[0]);
  });

  return (
    <>
      <div class="w-full flex items-center justify-center gap-x-10">
        <div class="p-5 rounded-full bg-slate-400">
          <IoClose size={24} color="#000000" />
        </div>
        <div class="max-w-[600px] rounded-lg border border-slate-800">
          <div class="flex-1 p-3">
            {/* <div
              class={cx([
                "h-[200px] bg-cover bg-no-repeat rounded-t-lg bg-center",
                css({
                  backgroundImage:
                    "url('https://affiliatewp.com/wp-content/uploads/2017/03/add-on-zapier-for-affiliatewp.png')",
                }),
              ])}
            /> */}
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
            <div class="text-center space-y-3 mb-8">
              <h3 class="text-lg font-bold">Location</h3>
              <div class="badge badge-accent p-3">{post().city}</div>
            </div>
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
            <div class="space-y-3">
              <h3 class="text-lg font-bold">About this position</h3>
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
              </div>
            </div>
          </div>
        </div>
        <div class="p-5 rounded-full bg-pink-500 flex items-center gap-x-3">
          <IoMail size={24} color="#ffffff" />
          {/* <span class="font-semibold">Apply</span> */}
        </div>
      </div>
    </>
  );
};

export default AppTop;
