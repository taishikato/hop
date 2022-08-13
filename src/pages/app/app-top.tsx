import { createResource, createSignal } from "solid-js";
import { IoMail, IoClose } from "solid-icons/io";

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
      </div>
    </div>
  );
};

export default AppTop;
