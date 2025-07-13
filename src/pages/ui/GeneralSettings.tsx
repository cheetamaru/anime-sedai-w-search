"use client"

import { useLocalStorage } from "usehooks-ts";

const GeneralSettings: React.FC = () => {
    const [dataSource, setDataSource] = useLocalStorage<"mal" | "anilist">(
        "dataSource",
        "mal"
      );
    
      const [lang, setLang] = useLocalStorage<"romaji" | "russian">(
        "lang",
        "romaji"
      );

    return <>
        <div className="flex flex-wrap justify-center mb-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Source of data:</span>
              <button
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  dataSource === "mal"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setDataSource("mal")}
              >
                MyAnimeList
              </button>
              <button
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  dataSource === "anilist"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setDataSource("anilist")}
              >
                AniList
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Title language:</span>
              <button
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  lang === "romaji"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setLang("romaji")}
              >
                Romaji
              </button>
              <button
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  lang === "russian"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setLang("russian")}
              >
                Russian
              </button>
            </div>
        </div>
    </>
}

export default GeneralSettings;