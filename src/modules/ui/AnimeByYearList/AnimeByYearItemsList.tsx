import { useAnimeTitleLangStorage } from "@/modules/hooks/useAnimeTitleLangStorage";
import { AnimeDataItem } from "@/modules/types/AnimeDataItem";
import { getAnimeTitle } from "@/modules/utils/animeDataGetters";

type Props = {
    items: AnimeDataItem[];
    selectedAnime: number[];
    handleClick: (isSelected: boolean, animeKey: number) => void;
    itemsInARow: number;
}

export const AnimeByYearItemsList = ({
    items,
    selectedAnime,
    handleClick,
    itemsInARow
}: Props) => {
    const [lang] = useAnimeTitleLangStorage();

    return <>
        {items.slice(0, itemsInARow).map((item) => {
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
                        transition-colors duration-200
                        ${
                            isSelected
                                ? "bg-green-300"
                                : "hover:bg-zinc-100"
                        }
                    `}
                    title={displayTitle}
                    onClick={() => {
                        handleClick(isSelected, animeKey);
                    }}
                >
                    <span
                        className="leading-tight w-full line-clamp-4"
                    >
                        {displayTitle}
                    </span>
                </button>
            );
        })}
        {Array.from(
            { length: Math.max(0, itemsInARow - items.length) },
            (_, index) => (
                <div
                    key={`empty-${index}`}
                    className="h-16 md:h-20 w-20 md:w-24 border-l bg-gray-50"
                />
            )
        )}
    </>
}