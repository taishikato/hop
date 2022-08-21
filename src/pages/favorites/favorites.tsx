import { createEffect, createSignal } from "solid-js";
import supabase from "../../supabaseClient";

const favorites = () => {
  const [favoriteList, setFavoriteList] = createSignal([]);

  createEffect(async () => {
    const authUser = supabase.auth.user();

    const { data, error } = await supabase
      .from("favorite_jobs")
      .select()
      .eq("user_id", authUser.id);

    setFavoriteList(data);
  });
  return (
    <div class="w-[700px] mx-auto border border-slate-800 rounded-lg p-3">
      {favoriteList().length > 0 &&
        favoriteList().map((item) => {
          return <div>{JSON.stringify(item)}</div>;
        })}
    </div>
  );
};

export default favorites;
