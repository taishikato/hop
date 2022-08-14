import { children, createEffect } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";
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
import Header from "./Header/Header";

const Layout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = createLoginStatus;
  const { isOpen, onOpen, onClose } = createDisclosure();
  const c = children(() => props.children);

  const handleLogin = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "github",
    });
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
        <Header onOpen={onOpen} />
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
