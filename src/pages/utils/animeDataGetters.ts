import { alAnimeData } from "@/pages/constants/anilistAnimeData"
import { malAnimeData } from "@/pages/constants/malAnimeData";
import { namesRu } from "@/pages/constants/translations";
import { AnimeDataItem } from "@/pages/types/AnimeDataItem";
import { AnimeTitleLang, isRussianTitleLang } from "../domain/AnimeTitleLang";

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
    lang: AnimeTitleLang
  ) => {
    if (isRussianTitleLang(lang)) {
      return namesRu.get(item.id) ?? item.title;
    }

    return item.title;
  };