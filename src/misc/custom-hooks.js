import { useState, useCallback, useEffect } from "react";
import { database } from "./firebase";

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

export const usePresence = (uid) => {
  const [presence, setPresence] = useState(null);

  useEffect(() => {
    const userStatusRef = database.ref(`/status/${uid}`);
    userStatusRef.on("value", (snap) => {
      if (snap.exists()) {
        const data = snap.val();
        setPresence(data);
      }
    });

    return () => {
      userStatusRef.off();
    };
  }, [uid]);

  return presence;
};
