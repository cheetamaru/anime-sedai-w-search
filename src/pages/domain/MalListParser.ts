import intersectionBy from 'lodash.intersectionby';
import { AnimeDataItem } from '../types/AnimeDataItem';

const getIntersectedMalAnimeList = (collection: AnimeDataItem[], externalData: AnimeDataItem[]) => {
    return intersectionBy(collection, externalData, "title")
}

export const MalListParser = {
    getIntersectedMalAnimeList,
}