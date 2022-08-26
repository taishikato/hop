const FavButton = ({ handleFunction, forMobile = false }) => (
  <button
    class={`p-5 rounded-full bg-pink-500 items-center gap-x-3 focus:outline-none hover:bg-pink-600 ${
      !forMobile ? "hidden md:block" : ""
    }`}
    onClick={(e) => handleFunction(e)}
  >
    <span class="block w-[24px] h-[24px]">🧡</span>
  </button>
);

export default FavButton;
