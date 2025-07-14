import { useAnimeTitleLangStorage } from "../hooks/useAnimeTitleLangStorage";
import { AnimeDataCollection } from "../types/AnimeDataCollection";
import { getAnimeTitle } from "../utils/animeDataGetters";

type Props = {
    animeData: AnimeDataCollection;
    selectedAnime: number[];
    handleClick: (isSelected: boolean, animeKey: number) => void;
}

export const AnimeByYearList = ({
    animeData,
    selectedAnime,
    handleClick
}: Props) => {
    const [lang] = useAnimeTitleLangStorage();

    return <>
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
                            handleClick(isSelected, animeKey);
                        }}
                        >
                        <span
                            className={"leading-tight w-full ine-clamp-4"}
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
                        className={"h-16 md:h-20 w-20 md:w-24 border-l bg-gray-50"}
                        />
                    )
                    )}
                    <div className="w-0 h-16 md:h-20 border-r" />
                </div>
                </div>
            );
        })}
    </>
}