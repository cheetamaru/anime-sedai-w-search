export const AnimeDataSource = {
    mal: "mal",
    anilist: "anilist"
} as const;

export type AnimeDataSource = typeof AnimeDataSource[keyof typeof AnimeDataSource];

export const defaultDataSource = AnimeDataSource.mal;

export const isMalDataSource = (dataSource: AnimeDataSource) => {
    return dataSource === AnimeDataSource.mal
}

export const isAnilistDataSource = (dataSource: AnimeDataSource) => {
    return dataSource === AnimeDataSource.anilist
}