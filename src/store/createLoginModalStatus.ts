import { createRoot } from "solid-js";
import { createDisclosure } from "@hope-ui/solid";

const createLoginModalStatus = () => {
  const { isOpen, onOpen, onClose } = createDisclosure();

  return { isOpen, onOpen, onClose };
};

export default createRoot(createLoginModalStatus);
