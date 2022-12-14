import { createEffect, createSignal } from "solid-js";
import supabase from "../../supabaseClient";
import NoItem from "./NoItem/NoItem";

type FavoriteItem = {
  startupjob_id: number;
  startupjob_title: string;
  startupjob_url: string;
  startupjob_commitment: string;
  startupjob_company_name: string;
  startupjob_city: string | null;
  startupjob_country: string | null;
};

const favorites = () => {
  const [favoriteList, setFavoriteList] = createSignal<FavoriteItem[]>([]);

  createEffect(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session == null) return;

    const authUser = session.user;

    const { data, error } = await supabase
      .from("favorite_jobs")
      .select()
      .eq("user_id", authUser.id);

    setFavoriteList(data);
  });
  return (
    <div class="w-[90%] mx-auto md:w-[700px] mb-12">
      <div class="text-2xl font-bold mb-4">Favorites</div>
      {favoriteList().length > 0 ? (
        <div class="border border-slate-800 rounded-lg p-3 space-y-6">
          {favoriteList().map((item) => {
            return (
              <a
                class="p-3 hover:bg-slate-800 rounded-lg block cursor-pointer"
                href={item.startupjob_url}
                target="_blank"
              >
                <div>{item.startupjob_company_name}</div>
                <div class="text-lg font-semibold">{item.startupjob_title}</div>
                {item.startupjob_city && item.startupjob_country && (
                  <div class="badge badge-secondary">
                    {item.startupjob_city} - {item.startupjob_country}
                  </div>
                )}
              </a>
            );
          })}
        </div>
      ) : (
        <NoItem />
      )}
    </div>
  );
};

export default favorites;
