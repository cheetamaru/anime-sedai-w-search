import { useRef } from "react";
import { toast, Toaster } from "sonner";
import { malAnimeData } from "@/modules/constants/malAnimeData";
import { alIds, malIds } from "@/modules/utils/animeDataGetters";
import { alAnimeData } from "@/modules/constants/anilistAnimeData";
import { copyImage, downloadImage } from "../utils/imageUtils";
import { GeneralActions } from "@/modules/ui/GeneralActions";
import GeneralSettings from "./GeneralSettings";
import ListHeader from "./ListHeader";
import { useDataSourceStorage } from "../../modules/hooks/useDataSourceStorage";
import { isAnilistDataSource } from "../domain/AnimeDataSource";
import { AnimeByYearList } from "./AnimeByYearList/AnimeByYearList";
import { useSelectedAnimeStorage } from "../../modules/hooks/useSelectedAnimeStorage";
import { CopyrightFooter } from "./CopyrightFooter";


const MainPage = () => {
  const [selectedAnime, setSelectedAnime] = useSelectedAnimeStorage();

  const [dataSource] = useDataSourceStorage();

  const wrapper = useRef<HTMLDivElement>(null);

  const animeData = isAnilistDataSource(dataSource) ? alAnimeData : malAnimeData;
  const ids = isAnilistDataSource(dataSource) ? alIds : malIds;

  const itemsInARow = 12;

  const totalAnime = Object.values(animeData).flatMap((year) => {
    return year.map((item) => item.id).slice(0, itemsInARow);
  }).length;

  const selectedAnimeSize = selectedAnime.filter((anime) =>
    ids.has(anime)
  ).length;

  const selectAllAnime = () => {
    setSelectedAnime(
        Object.values(animeData).flatMap((year) => {
          return year.map((item) => item.id).slice(0, itemsInARow);
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

  const handleClick = (isSelected: boolean, animeKey: number) => {
    setSelectedAnime((prev) => {
      if (isSelected) {
        return prev.filter(
          (title) => title !== animeKey
        );
      }
      return [...prev, animeKey];
    });
  }

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
              <AnimeByYearList
                animeData={animeData}
                selectedAnime={selectedAnime}
                handleClick={handleClick}
                itemsInARow={itemsInARow}
              />
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
      <CopyrightFooter />
      <Toaster />
    </>
  );
};

export default MainPage;
