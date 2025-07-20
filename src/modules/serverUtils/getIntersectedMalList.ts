import { malAnimeData } from "../constants/malAnimeData";
import { MalListParser } from "../domain/MalListParser"
import { getFullMalList } from "./getFullMalList";

const { getIntersectedMalAnimeList} = MalListParser;

export const getIntersectedMalList = async (username: string) => {
    const userList = await getFullMalList(username);
    
    return getIntersectedMalAnimeList(Object.values(malAnimeData).flat(), userList.map((el) => el.node))
}