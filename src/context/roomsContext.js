import transitions from "@material-ui/core/styles/transitions";
import React, { useEffect } from "react";
import { database } from "../misc/firebase";

const RoomsContext = React.createContext();

const transformToArray = (roomsObj) => {
  return roomsObj
    ? Object.keys(roomsObj).map((roomId) => {
        return { ...roomsObj[roomId], id: roomId };
      })
    : [];
};

function RoomsProvider({ children }) {
  const [rooms, setRooms] = React.useState(null);

  useEffect(() => {
    const roomsRef = database.ref("rooms");

    roomsRef.on("value", (snap) => {
      const data = transformToArray(snap.val());
      console.log(data);
    });
  });

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
}

export default RoomsProvider;
