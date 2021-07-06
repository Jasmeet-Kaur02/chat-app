import React, { useContext, createContext, useEffect } from "react";
import { auth, database } from "../misc/firebase";
import firebase from "firebase/app";

export const isOfflineForDatabase = {
  state: "offline",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: "online",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    let userRef;
    let userStatusRef;
    const authUnsub = auth.onAuthStateChanged((authObj) => {
      if (authObj) {
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        userRef.on("value", (snap) => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
        });

        database.ref(".info/connected").on("value", (snapshot) => {
          if (!!snapshot.val() === false) {
            return;
          }

          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusRef.set(isOnlineForDatabase);
            });
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        if (userStatusRef) {
          userStatusRef.off();
        }
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      authUnsub();

      if (userRef) {
        userRef.off();
      }

      if (userStatusRef) {
        userStatusRef.off();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
