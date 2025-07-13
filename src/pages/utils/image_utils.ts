import { domToBlob } from "modern-screenshot";

const imageToBlob = async (wrapper: HTMLDivElement | null) => {
    if (!wrapper) return;

    const blob = await domToBlob(wrapper, {
      scale: 2,
      filter(el) {
        if (el instanceof HTMLElement && el.classList.contains("remove")) {
          return false;
        }
        return true;
      },
    });

    return blob;
  };

  export const copyImage = async (wrapper: HTMLDivElement | null) => {
    const blob = await imageToBlob(wrapper);

    if (!blob) return;

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
  };

  export const downloadImage = async (wrapper: HTMLDivElement | null) => {
    if (!wrapper) return;

    const blob = await imageToBlob(wrapper);

    if (!blob) return;

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "anime-sedai.png";
    a.click();

    URL.revokeObjectURL(url);
  };