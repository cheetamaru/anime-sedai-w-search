import { alAnimeData } from "@/pages/constants/anilistAnimeData"
import { malAnimeData } from "@/pages/constants/malAnimeData";
import { namesRu } from "@/pages/constants/translations";
import { AnimeDataItem } from "@/pages/types/AnimeDataItem";

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
    item: AnimeDataItem,
    lang?: string
  ) => {
    if (lang === "russian") {
      return namesRu.get(item.id) ?? item.title;
    }

    return item.title;
  };