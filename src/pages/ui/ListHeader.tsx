"use client"

import { siteName, siteUrl } from "../constants/brand"

type Props = {
    selectedAnimeSize: number;
    totalAnime: number;
}

const ListHeader = ({selectedAnimeSize, totalAnime}: Props) => {
    return <>
        <div className="border-b justify-between p-2 text-lg font-bold flex">
            <div className="flex flex-wrap gap-1">
                <div>
                    {siteName}
                </div>
  
                <div>
                    — Click to select anime you have watched
                </div>
                <div className="text-zinc-400 font-medium">
                    {siteUrl}
                </div>
            </div>
            <div className="shrink-0 whitespace-nowrap">
                I have watched {selectedAnimeSize}/{totalAnime} anime
            </div>
        </div>
    </>
}

export default ListHeader;