import { Link } from "@solidjs/router";
import createLoginStatus from "../../store/createLoginStatus";
import Avatar from "./Avatar/Avatar";

const Header = ({ onOpen }: { onOpen: () => void }) => {
  const { isLogin } = createLoginStatus;

  return (
    <div class="navbar border-b border-slate-800">
      <div class="flex-1">
        <Link
          href="/"
          class="px-4 text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500  to-blue-500"
        >
          Hop
        </Link>
      </div>
      <div class="flex-none">
        {isLogin() ? (
          <Avatar />
        ) : (
          <button class="btn btn-primary rounded-full" onClick={onOpen}>
            Login / Sign up
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
