import { alAnimeData } from "@/pages/constants/anilist_anime_data"
import { malAnimeData } from "@/pages/constants/mal_anime_data";
import { namesRu } from "@/pages/constants/translations";

export const malIds = new Set(
    Object.values(malAnimeData)
      .flat()
      .map((data) => data.id)
  );
  export const alIds = new Set(
    Object.values(alAnimeData)
      .flat()
      .map((data) => data.id)
  );
  
  export const getAnimeTitle = (
    item: { id: number; title: string },
    lang?: string
  ) => {
    if (lang === "russian") {
      return namesRu.get(item.id) ?? item.title;
    }

    return item.title;
  };