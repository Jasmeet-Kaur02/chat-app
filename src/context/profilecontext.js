import { createReadStream } from "fs";
import React, { useContext, createContext, useEffect } from "react";
import { auth, database } from "../misc/firebase";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    let userRef;
    const authUnsub = auth.onAuthStateChanged((authObj) => {
      if (authObj) {
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on("value", (snap) => {
          const { name, createdAt } = snap.val();

          const data = {
            name,
            createdAt,
            uid: auth.uid,
            email: auth.email,
          };
          setProfile(data);
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      authUnsub();
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
