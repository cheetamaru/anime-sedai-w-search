import { useRef } from "react";
import { toast, Toaster } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { malAnimeData } from "@/pages/constants/malAnimeData";
import { alIds, getAnimeTitle, malIds } from "@/pages/utils/animeDataGetters";
import { alAnimeData } from "@/pages/constants/anilistAnimeData";
import { copyImage, downloadImage } from "../utils/imageUtils";
import { siteName, siteUrl } from "../constants/brand";

export const MainPage = () => {
  const [selectedAnime, setSelectedAnime] = useLocalStorage<number[]>(
    "selectedAnimeIds",
    []
  );

  const [dataSource, setDataSource] = useLocalStorage<"mal" | "anilist">(
    "dataSource",
    "mal"
  );

  const [lang, setLang] = useLocalStorage<"romaji" | "russian">(
    "lang",
    "romaji"
  );

  const wrapper = useRef<HTMLDivElement>(null);
  const language = "en";

  const animeData = dataSource === "anilist" ? alAnimeData : malAnimeData;
  const ids = dataSource === "anilist" ? alIds : malIds;

  const totalAnime = Object.values(animeData).flatMap((year) => {
    return year.map((item) => item.id).slice(0, 12);
  }).length;

  const selectedAnimeSize = selectedAnime.filter((anime) =>
    ids.has(anime)
  ).length;

  const selectAllAnime = () => {
    setSelectedAnime(
        Object.values(animeData).flatMap((year) => {
          return year.map((item) => item.id).slice(0, 12);
        })
      );
  }

  const clearAllAnime = () => {
    setSelectedAnime([])
  }

  const copyCurrentChosenState = () => {
    toast.promise(copyImage(wrapper.current), {
        success: `Copy successfull`,
        loading: `Copying`,
        error(error) {
          return `Copy failed, reason: ${
            error instanceof Error ? error.message : `Unknown error`
          }`;
        },
      });
  }

  const downloadCurrentState = () => {
    toast.promise(downloadImage(wrapper.current), {
        success: `Download success`,
        loading: `Downloading`,
        error(error) {
          return `Download failed, reason: ${
            error instanceof Error ? error.message : `Unknown error`
          }`;
        },
      });
  }

  const isClearButtonShown = selectedAnime.length > 0;

  return (
    <>
      <div className="flex flex-col gap-4 pb-10">
        <div className="p-4 flex flex-col md:items-center">
          <div className="flex justify-end mb-4 gap-4">
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
          <div className="w-full overflow-x-auto">
            <div
              className="flex flex-col border border-b-0 bg-white w-fit mx-auto"
              ref={wrapper}
            >
              <div className="border-b justify-between p-2 text-lg  font-bold flex">
                <h1>
                  {siteName}
                  <span className="remove">
                    {" "}
                    - Click to select anime you have watched
                  </span>
                  <span className="ml-2 text-zinc-400 font-medium">
                    {siteUrl}
                  </span>
                </h1>
                <span className="shrink-0 whitespace-nowrap">
                  I have watched {selectedAnimeSize}/{totalAnime} anime
                </span>
              </div>
              {Object.keys(animeData).map((year) => {
                const items = animeData[year as keyof typeof animeData] || [];
                return (
                  <div key={year} className="flex border-b">
                    <div
                      className={`
                      bg-red-400 shrink-0 text-white flex items-center font-bold justify-center p-1 border-black h-16 md:h-20 w-16 md:w-20
                    `}
                    >
                      <span className={`text-sm md:text-base text-center`}>
                        {year}
                      </span>
                    </div>
                    <div className="flex shrink-0">
                      {items.slice(0, 12).map((item) => {
                        const animeKey = item.id;
                        const displayTitle = getAnimeTitle(item, lang);
                        const isSelected = selectedAnime.includes(animeKey);
                        return (
                          <button
                            key={animeKey}
                            className={`
                              h-16 md:h-20 
                              w-20 md:w-24
                              border-l break-words text-center shrink-0 inline-flex items-center 
                              p-1 overflow-hidden justify-center cursor-pointer 
                              text-xs
                              ${
                                isSelected
                                  ? "bg-green-300"
                                  : "hover:bg-zinc-100"
                              }
                              transition-colors duration-200
                            `}
                            title={displayTitle}
                            onClick={() => {
                              setSelectedAnime((prev) => {
                                if (isSelected) {
                                  return prev.filter(
                                    (title) => title !== animeKey
                                  );
                                }
                                return [...prev, animeKey];
                              });
                            }}
                          >
                            <span
                              className={`leading-tight w-full ${
                                language === "en"
                                  ? "line-clamp-4"
                                  : "line-clamp-3"
                              }`}
                            >
                              {displayTitle}
                            </span>
                          </button>
                        );
                      })}
                      {Array.from(
                        { length: Math.max(0, 12 - items.length) },
                        (_, index) => (
                          <div
                            key={`empty-${index}`}
                            className={`
                            h-16 md:h-20 
                            ${
                              language === "en"
                                ? "w-20 md:w-24"
                                : "w-16 md:w-20"
                            }
                            border-l bg-gray-50
                          `}
                          />
                        )
                      )}
                      <div className="w-0 h-16 md:h-20 border-r" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <button
            type="button"
            className="border rounded-md px-4 py-2 inline-flex"
            onClick={selectAllAnime}
          >
            Select all
          </button>

          {isClearButtonShown && (
            <button
              type="button"
              className="border rounded-md px-4 py-2 inline-flex"
              onClick={clearAllAnime}
            >
              Clear
            </button>
          )}

          <button
            type="button"
            className="border rounded-md px-4 py-2 inline-flex"
            onClick={copyCurrentChosenState}
          >
            Copy Image
          </button>

          <button
            type="button"
            className="border rounded-md px-4 py-2 inline-flex"
            onClick={downloadCurrentState}
          >
            Download Image
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
};