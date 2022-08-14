import { children, createEffect } from "solid-js";
import { Link, NavLink, useNavigate, useLocation } from "@solidjs/router";
import supabase from "../supabaseClient";
import createLoginStatus from "../store/createLoginStatus";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  createDisclosure,
} from "@hope-ui/solid";

const Layout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout, isLogin } = createLoginStatus;
  const { isOpen, onOpen, onClose } = createDisclosure();
  const c = children(() => props.children);

  const handleLogin = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "github",
    });
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    logout();
  };

  createEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event !== "SIGNED_IN") return;

      login();

      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", session.user.id);

      if (data.length > 0) {
        if (location.pathname === "/app") return;

        navigate("/app");
        return;
      }

      // For the user who log-in for the first time
      navigate("/welcome");
    });
  });

  return (
    <>
      <div class="bg-black text-slate-100 flex flex-col gap-y-10 min-h-screen pb-10">
        <header class="border-b border-slate-900 p-3">
          <div class="flex justify-between items-center w-[80%] mx-auto">
            <div />
            <Link
              href="/"
              class="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500  to-blue-500"
            >
              Hop
            </Link>
            {/* <NavLink
              href="/profile"
              class="px-4 py-2 font-bold text-base hover:bg-gray-900 rounded-3xl"
            >
              Profile
            </NavLink> */}

            {isLogin() ? (
              <button
                class="px-4 py-2 font-bold text-base hover:bg-gray-900 rounded-3xl"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                class="px-4 py-2 font-bold text-base hover:bg-gray-900 rounded-3xl"
                onClick={onOpen}
              >
                Login/Sign up
              </button>
            )}
          </div>
        </header>
        {c()}
      </div>
      {/* start Modal */}
      <Modal opened={isOpen()} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalCloseButton /> */}
          <ModalHeader>Login/Sign up</ModalHeader>
          <ModalBody class="text-center">
            <Button colorScheme="accent" size="lg" onClick={handleLogin}>
              Login
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="subtle" colorScheme="neutral">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Layout;
