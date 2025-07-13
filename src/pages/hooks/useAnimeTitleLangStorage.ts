import { useLocalStorage } from "usehooks-ts";
import { AnimeTitleLang, defaultAnimeTitleLang } from "../domain/AnimeTitleLang";

export const useAnimeTitleLangStorage = () => {
    return useLocalStorage<AnimeTitleLang>(
        "animeTitleLang",
        defaultAnimeTitleLang
    );
}