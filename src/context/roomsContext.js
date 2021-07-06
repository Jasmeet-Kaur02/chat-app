import React, { useEffect, useContext } from "react";
import { database } from "../misc/firebase";
import { transformToArray } from "../misc/helperFunctions";

export const RoomsContext = React.createContext();

export function RoomsProvider({ children }) {
  const [rooms, setRooms] = React.useState(null);

  useEffect(() => {
    const roomsRef = database.ref("rooms");

    roomsRef.on("value", (snap) => {
      const data = transformToArray(snap.val());
      setRooms(data);
    });

    return () => {
      roomsRef.off();
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
}

export const useRooms = () => useContext(RoomsContext);
