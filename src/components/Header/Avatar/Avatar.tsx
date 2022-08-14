import supabase from "../../../supabaseClient";
import createLoginStatus from "../../../store/createLoginStatus";

const Avatar = () => {
  const { logout } = createLoginStatus;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    logout();
  };

  return (
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a class="justify-between">Profile</a>
        </li>
        <li>
          <a>Settings</a>
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