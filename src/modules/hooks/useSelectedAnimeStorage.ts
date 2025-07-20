import { useLocalStorage } from "usehooks-ts";

export const useSelectedAnimeStorage = () => {
    return useLocalStorage<number[]>(
        "selectedAnimeIds",
        []
      );
}