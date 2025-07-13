import { useLocalStorage } from "usehooks-ts";
import { AnimeDataSource, defaultDataSource } from "../domain/AnimeDataSource";

export const useDataSourceStorage = () => {
    return useLocalStorage<AnimeDataSource>(
        "animeDataSource",
        defaultDataSource
    );
}