import { IoClose } from "solid-icons/io";

const PassButton = ({ handleFunction, forMobile = false }) => {
  return (
    <button
      class={`p-5 rounded-full bg-slate-400 ${
        !forMobile ? "hidden md:block" : ""
      }`}
      onClick={(e) => handleFunction(e)}
    >
      <span class="block w-[24px] h-[24px]">👋</span>
    </button>
  );
};

export default PassButton;
