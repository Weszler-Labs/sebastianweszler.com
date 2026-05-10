export interface Dict {
  [key: string]: string | Dict;
}

export function getT(dict: Dict) {
  return (path: string): string => {
    const keys = path.split(".");
    let current: string | Dict = dict;
    for (const key of keys) {
      if (typeof current === "object" && current !== null && key in current) {
        current = current[key] as string | Dict;
      } else {
        return path;
      }
    }
    return typeof current === "string" ? current : path;
  };
}
