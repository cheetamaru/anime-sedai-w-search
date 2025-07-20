"use client"

import { AnimeDataSource, isAnilistDataSource, isMalDataSource } from "../domain/AnimeDataSource";
import { useDataSourceStorage } from "../hooks/useDataSourceStorage";
import { useAnimeTitleLangStorage } from "../hooks/useAnimeTitleLangStorage";
import { AnimeTitleLang, isRomajiTitleLang, isRussianTitleLang } from "../domain/AnimeTitleLang";
import { UsernameSearch } from "./UsernameSearch";

const GeneralSettings = () => {
    const [dataSource, setDataSource] = useDataSourceStorage();
    const [lang, setLang] = useAnimeTitleLangStorage();

    const getButtonClasses = (isSelected?: boolean) => {
        return `px-3 py-1 text-sm rounded transition-colors ${isSelectedClass(isSelected)}`
    }

    const isSelectedClass = (isSelected?: boolean) => {
        return isSelected
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }

    return <>
        <UsernameSearch />
        <div className="flex flex-wrap justify-center mb-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Source of data:</span>
              <button
                className={getButtonClasses(isMalDataSource(dataSource))}
                onClick={() => setDataSource(AnimeDataSource.mal)}
              >
                MyAnimeList
              </button>
              <button
                className={getButtonClasses(isAnilistDataSource(dataSource))}
                onClick={() => setDataSource(AnimeDataSource.anilist)}
              >
                AniList
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Title language:</span>
              <button
                className={getButtonClasses(isRomajiTitleLang(lang))}
                onClick={() => setLang(AnimeTitleLang.romaji)}
              >
                Romaji
              </button>
              <button
                className={getButtonClasses(isRussianTitleLang(lang))}
                onClick={() => setLang(AnimeTitleLang.russian)}
              >
                Russian
              </button>
            </div>
        </div>
    </>
}

export default GeneralSettings;