import { children } from "solid-js";
import { Link, NavLink } from "@solidjs/router";

const Layout = (props) => {
  const c = children(() => props.children);

  return (
    <div class="bg-black text-slate-100 flex flex-col gap-y-10 min-h-screen pb-10">
      <header class="border-b border-slate-900 p-3">
        <div class="flex justify-between items-center w-[80%] mx-auto">
          <div />
          <Link
            href="/"
            class="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500  to-blue-500"
          >
            Header
          </Link>
          <NavLink
            href="/profile"
            class="px-4 py-2 font-bold text-base hover:bg-gray-900 rounded-3xl"
          >
            Profile
          </NavLink>
        </div>
      </header>
      {c()}
    </div>
  );
};

export default Layout;
