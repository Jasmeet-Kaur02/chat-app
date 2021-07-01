import { useState, useCallback, useEffect } from "react";

export function useModalState(defaultVal = false) {
  const [isOpen, setOpen] = useState(defaultVal);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return [isOpen, open, close];
}

export const useMediaQuery = (query) => {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatch(queryList.matches);

    const listener = (evt) => setMatch(evt.matches);
    queryList.addEventListener("change", listener);

    return () => {
      queryList.removeEventListener("change", listener);
    };
  }, [query]);

  return match;
};
