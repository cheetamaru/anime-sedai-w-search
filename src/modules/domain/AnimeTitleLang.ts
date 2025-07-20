export const AnimeTitleLang = {
    romaji: "romaji",
    russian: "russian"
} as const;

export type AnimeTitleLang = typeof AnimeTitleLang[keyof typeof AnimeTitleLang];

export const defaultAnimeTitleLang = AnimeTitleLang.romaji;

export const isRomajiTitleLang = (dataSource: AnimeTitleLang) => {
    return dataSource === AnimeTitleLang.romaji
}

export const isRussianTitleLang = (dataSource: AnimeTitleLang) => {
    return dataSource === AnimeTitleLang.russian
}
