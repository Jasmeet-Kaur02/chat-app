import React, { useEffect, useContext } from "react";
import { database } from "../misc/firebase";

export const RoomsContext = React.createContext();

const transformToArray = (roomsObj) => {
  return roomsObj
    ? Object.keys(roomsObj).map((roomId) => {
        return { ...roomsObj[roomId], id: roomId };
      })
    : [];
};

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

export const useRoomsContext = () => useContext(RoomsContext);
