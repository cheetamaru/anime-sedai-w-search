import { AnimeDataItem } from "./AnimeDataItem";

type YearString = string;

export type AnimeDataCollection = Record<YearString, AnimeDataItem[]>;
