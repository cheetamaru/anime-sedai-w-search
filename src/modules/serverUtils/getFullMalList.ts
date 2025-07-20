import { malApiAdapter } from "@/services/api/myAnimeListApiAdapter";
import { MalGetListParams } from "@/services/api/types/MalGetListParams";

const defaultParams: MalGetListParams = {
  status: "completed"
}

export const getFullMalList = async (username: string) => {
    const result = [];
    const limit = 1000;
    let offset = 0;
    let hasNextPaging = false;

    do {
        const {data, paging} = await malApiAdapter.getUserAnimeList({
            username,
            params: {
              ...defaultParams,
              limit,
              offset,
            }
        });

        result.push(...data)

        hasNextPaging = Boolean(paging?.next);

        offset += limit;
    } while(hasNextPaging);

    return result
}
