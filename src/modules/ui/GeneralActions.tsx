type Props = {
    isClearButtonShown: boolean;
    selectAllAnime: () => void;
    clearAllAnime: () => void;
    copyCurrentChosenState: () => void;
    downloadCurrentState: () => void;
}

export const GeneralActions = ({
    isClearButtonShown,
    selectAllAnime,
    clearAllAnime,
    copyCurrentChosenState,
    downloadCurrentState
}: Props) => {
    return <>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            className="border rounded-md px-4 py-2 inline-flex"
            onClick={selectAllAnime}
          >
            Select all
          </button>

          {isClearButtonShown && (
            <button
              type="button"
              className="border rounded-md px-4 py-2 inline-flex"
              onClick={clearAllAnime}
            >
              Clear
            </button>
          )}

          <button
            type="button"
            className="border rounded-md px-4 py-2 inline-flex"
            onClick={copyCurrentChosenState}
          >
            Copy Image
          </button>

          <button
            type="button"
            className="border rounded-md px-4 py-2 inline-flex"
            onClick={downloadCurrentState}
          >
            Download Image
          </button>
        </div>
    </>
}