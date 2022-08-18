import { createResource, createSignal } from "solid-js";
import { IoMail, IoClose } from "solid-icons/io";
import { css, cx } from "@emotion/css";

const fetchUser = async (id) =>
  (await fetch(`https://swapi.dev/api/people/${id}/`)).json();

const AppTop = () => {
  const [id, setId] = createSignal(Math.floor(Math.random() * 10) + 1);

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      setId(Math.floor(Math.random() * 10) + 1);
    } else if (e.key === "ArrowLeft") {
      setId(Math.floor(Math.random() * 10) + 1);
    }
  });

  const [data] = createResource(id, fetchUser);

  return (
    <div class="w-full">
      <div class="max-w-[600px] rounded-lg mx-auto border border-slate-800">
        <div class="flex-1 p-3">
          <div
            class={cx([
              "h-[200px] bg-cover bg-no-repeat rounded-t-lg bg-center",
              css({
                backgroundImage:
                  "url('https://affiliatewp.com/wp-content/uploads/2017/03/add-on-zapier-for-affiliatewp.png')",
              }),
            ])}
          />
          <h2 class="text-2xl font-bold text-center mb-3 mt-5">
            Fullstack Engineer
          </h2>
          <div class="text-center space-y-3 mb-8">
            <h3 class="text-lg font-bold">Salary</h3>
            <div class="badge badge-primary p-3">$110k - 140k</div>
          </div>
          <div class="text-center space-y-3 mb-8">
            <h3 class="text-lg font-bold">Location</h3>
            <div class="badge badge-accent p-3">Remote</div>
          </div>
          <div class="text-center space-y-3 mb-8">
            <h3 class="text-lg font-bold">Required Skills</h3>
            <div class="flex gap-3 justify-center">
              {["JavScript", "TypeScript", "React", "GraphQL"].map((skill) => {
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
          <div>
            <h3 class="text-lg font-bold">Required Skills</h3>
            <div>
              Zapier’s on a mission to make everyone more productive at work. As
              we continue to scale our mission to democratize automation, we’re
              hiring Frontend Engineers across the organization. Zapier has
              helped millions of people build businesses through the power of
              automation. Here is the team you might join: Billing team. The
              Billing Team strives to make it incredibly easy to purchase Zapier
              across the globe. Join us as we build systems that power
              purchasing, subscription management, and customer support. You’ll
              be part of our team focused on making it easier for our largest
              customers to buy Zapier. We practice...
            </div>
          </div>
        </div>
      </div>
      {/* <div class="text-2xl font-bold text-center mb-8">Job Post here</div>
      <div class="flex items-center justify-center gap-x-10">
        <div class="p-5 rounded-full bg-slate-400">
          <IoClose size={24} color="#000000" />
        </div>
        <div class="w-[800px] rounded-3xl bg-slate-900">
          <div class="p-3">
            <pre>{JSON.stringify(data(), null, 2)}</pre>
          </div>
        </div>
        <div class="p-5 rounded-full bg-pink-500 flex items-center gap-x-3">
          <IoMail size={24} color="#ffffff" />
          <span class="font-semibold">Apply</span>
        </div>
      </div> */}
    </div>
  );
};

export default AppTop;
