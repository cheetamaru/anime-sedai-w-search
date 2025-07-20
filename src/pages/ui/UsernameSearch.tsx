import { useState } from "react";
import { useSelectedAnimeStorage } from "../hooks/useSelectedAnimeStorage";
import { getUserSelectedAnime } from "../utils/getUserSelectedAnime";

export const UsernameSearch = () => {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const [, setSelectedAnime] = useSelectedAnimeStorage();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
        e.preventDefault();
        handleRequest();
        }
    };

    const handleClear = () => {
        setUsername("");
        setSelectedAnime([]);
    };

    const handleRequest = async() => {
        setLoading(true);
        const selected = (await getUserSelectedAnime(username)) || []
        setLoading(false)

        setSelectedAnime(selected)
    }


    return <>
        <div className="flex items-center w-full max-w-md mx-auto border border-gray-300 rounded-md overflow-hidden shadow-sm mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter MAL username"
              className="flex-1 px-4 py-2 text-sm focus:outline-none"
            />
          </div>
          {username && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="px-3 text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Очистить"
            >
              ✕
            </button>
          )}
          <button
            type="submit"
            onClick={handleRequest}
            disabled={loading}
            className={`px-4 py-2 text-sm font-medium text-white transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Loading' : 'Search'}
          </button>
        </div>
    </>
}