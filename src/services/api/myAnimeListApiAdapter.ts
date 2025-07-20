import { toQueryString } from "@/pages/utils/toQueryString";
import { MalGetListParams } from "./types/MalGetListParams";

type GetUserAnimeListParams = {
    username: string;
    params?: MalGetListParams;
}

const getUserAnimeList = async ({
    username = "lys1n",
    params
}: GetUserAnimeListParams) => {
    const val = process.env.MAL_CLIENT_ID

    if (!val) {
        throw new Error("MAL_CLIENT_ID is not provided")
    }

    const queryString = toQueryString(params || {})

    const response = await fetch(`https://api.myanimelist.net/v2/users/${username}/animelist?${queryString}`, {
        headers: {
            "X-MAL-CLIENT-ID": String(val),
          },
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json
}

export const malApiAdapter = {
    getUserAnimeList
}