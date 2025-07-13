import { useRef } from "react";
import { toast, Toaster } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { malAnimeData } from "@/pages/constants/malAnimeData";
import { alIds, getAnimeTitle, malIds } from "@/pages/utils/animeDataGetters";
import { alAnimeData } from "@/pages/constants/anilistAnimeData";
import { copyImage, downloadImage } from "../utils/imageUtils";
import { GeneralActions } from "@/pages/ui/GeneralActions";
import GeneralSettings from "./GeneralSettings";
import ListHeader from "./ListHeader";


const MainPage = () => {
  const [selectedAnime, setSelectedAnime] = useLocalStorage<number[]>(
    "selectedAnimeIds",
    []
  );

  const [dataSource] = useLocalStorage<"mal" | "anilist">(
    "dataSource",
    "mal"
  );

  const [lang] = useLocalStorage<"romaji" | "russian">(
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
          <GeneralSettings />
          <div className="w-full overflow-x-auto">
            <div
              className="flex flex-col border border-b-0 bg-white w-fit mx-auto"
              ref={wrapper}
            >
                <ListHeader
                    selectedAnimeSize={selectedAnimeSize}
                    totalAnime={totalAnime}
                />
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

        <GeneralActions
            isClearButtonShown={isClearButtonShown}
            selectAllAnime={selectAllAnime}
            clearAllAnime={clearAllAnime}
            copyCurrentChosenState={copyCurrentChosenState}
            downloadCurrentState={downloadCurrentState}
        />
      </div>
      <Toaster />
    </>
  );
};

export default MainPage;
