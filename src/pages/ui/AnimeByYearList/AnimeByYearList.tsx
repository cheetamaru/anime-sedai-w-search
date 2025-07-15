import { AnimeDataCollection } from "../../types/AnimeDataCollection";
import { AnimeByYearItemsList } from "./AnimeByYearItemsList";

type Props = {
    animeData: AnimeDataCollection;
    selectedAnime: number[];
    handleClick: (isSelected: boolean, animeKey: number) => void;
    itemsInARow: number;
}

export const AnimeByYearList = ({
    animeData,
    selectedAnime,
    handleClick,
    itemsInARow
}: Props) => {
    return <>
        {Object.keys(animeData).map((year) => {
            const items = animeData[year] || [];

            return (
                <div key={year} className="flex border-b">
                    <div
                        className="bg-red-400 shrink-0 text-white flex items-center font-bold justify-center p-1 border-black h-16 md:h-20 w-16 md:w-20"
                    >
                        <span className="text-sm md:text-base text-center">
                            {year}
                        </span>
                    </div>
                    <div className="flex shrink-0">
                        <AnimeByYearItemsList
                            items={items}
                            selectedAnime={selectedAnime}
                            handleClick={handleClick}
                            itemsInARow={itemsInARow}
                        />
                    </div>
                </div>
            );
        })}
    </>
}