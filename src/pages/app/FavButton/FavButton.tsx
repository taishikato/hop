import { IoHeart } from "solid-icons/io";

const FavButton = ({ handleFunction, forMobile = false }) => {
  return (
    <button
      class={`p-5 rounded-full bg-pink-500 items-center gap-x-3 focus:outline-none hover:bg-pink-600 ${
        !forMobile ? "hidden md:block" : ""
      }`}
      onClick={(e) => handleFunction(e)}
    >
      <IoHeart size={24} color="#ffffff" />
    </button>
  );
};

export default FavButton;
