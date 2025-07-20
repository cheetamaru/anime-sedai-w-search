export const toQueryString = (params: Record<string, unknown>): string => {
    const entries = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .flatMap(([key, value]) =>
        Array.isArray(value)
          ? value.map(v => [key, String(v)])
          : [[key, String(value)]]
      );
  
    return new URLSearchParams(entries).toString();
  }