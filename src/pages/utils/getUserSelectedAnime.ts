import { AnimeDataItem } from "../types/AnimeDataItem";
import { toast } from "sonner";

export const getUserSelectedAnime = async (username: string) => {
    const res = await fetch(`/api/mal_list?username=${username}`);

    if (!res.ok) {
        toast.error("Error on data fetching!")
        return
    }

    const { result } = await res.json()

    return result.map((el: AnimeDataItem) => el.id)
}
