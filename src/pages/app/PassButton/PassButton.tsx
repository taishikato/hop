import { IoClose } from "solid-icons/io";

const PassButton = ({ handleFunction, forMobile = false }) => {
  return (
    <button
      class={`p-5 rounded-full bg-slate-400 ${
        !forMobile ? "hidden md:block" : ""
      }`}
      onClick={(e) => handleFunction(e)}
    >
      <IoClose size={24} color="#000000" />
    </button>
  );
};

export default PassButton;
