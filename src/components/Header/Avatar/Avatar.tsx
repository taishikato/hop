import supabase from "../../../supabaseClient";
import createLoginStatus from "../../../store/createLoginStatus";
import { Link, useNavigate } from "@solidjs/router";
import createJobPosts from "../../../store/createJobPosts";
import { createEffect, createSignal } from "solid-js";

const Avatar = () => {
  const navigate = useNavigate();
  const { logout } = createLoginStatus;
  const { initJobPosts } = createJobPosts;
  const [name, setName] = createSignal("");

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    logout();
    initJobPosts();

    navigate("/");
  };

  createEffect(async () => {
    const authUser = supabase.auth.user();
    if (authUser == null) return;

    const { data }: { data: { name: string } } = await supabase
      .from("users")
      .select("name")
      .eq("id", authUser.id)
      .single();

    setName(data.name);
  });

  return (
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="avatar placeholder">
          <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
            <span>{name().charAt(0)}</span>
          </div>
        </div>
      </label>
      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/favorites">Favorites</Link>
        </li>
        <li>
          <a
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Avatar;
