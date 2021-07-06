export const getName = (name) => {
  const splitName = name.toUpperCase().split(" ");

  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  }
  return splitName[0][0];
};

export const transformToArray = (roomsObj) => {
  return roomsObj
    ? Object.keys(roomsObj).map((roomId) => {
        return { ...roomsObj[roomId], id: roomId };
      })
    : [];
};

export const getUpdates = async (updateId, keyToUpdate, newValue, db) => {
  const updates = {};

  updates[`/profiles/${updateId}/${keyToUpdate}`] = newValue;

  const getMsg = db
    .ref("messages")
    .orderByChild("author/uid")
    .equalTo(updateId)
    .once("value");
  const getRooms = db
    .ref("rooms")
    .orderByChild("lastMessage/author/uid")
    .equalTo(updateId)
    .once("value");

  const [MSnap, RSnap] = await Promise.all([getMsg, getRooms]);

  MSnap.forEach((msgSnap) => {
    updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = newValue;
  });

  RSnap.forEach((roomsSnap) => {
    updates[`/rooms/${roomsSnap.key}/lastMessage/author/${keyToUpdate}`] =
      newValue;
  });

  return updates;
};
