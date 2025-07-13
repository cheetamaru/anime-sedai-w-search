"use client"

import { siteName, siteUrl } from "../constants/brand"

type Props = {
    selectedAnimeSize: number;
    totalAnime: number;
}

const ListHeader = ({selectedAnimeSize, totalAnime}: Props) => {
    return <>
        <div className="border-b justify-between p-2 text-lg  font-bold flex">
            <h1>
                {siteName}
                <span className="remove">
                {" "}
                - Click to select anime you have watched
                </span>
                <span className="ml-2 text-zinc-400 font-medium">
                {siteUrl}
                </span>
            </h1>
            <span className="shrink-0 whitespace-nowrap">
                I have watched {selectedAnimeSize}/{totalAnime} anime
            </span>
        </div>
    </>
}

export default ListHeader;