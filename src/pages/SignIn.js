import React from "react";
import { makeStyles, Button, Container, Grid } from "@material-ui/core";
import { Icon, Alert } from "rsuite";
import { auth } from "../misc/firebase";
import firebase from "firebase/app";
import { database } from "../misc/firebase";

const useStyles = makeStyles({
  google: {
    backgroundColor: "#2196f3",
    color: "white",
    "&:hover": {
      backgroundColor: "#167acc",
    },
    marginTop: "25px",
  },
});

function SignIn() {
  const classes = useStyles();

  const signIn = async (provider) => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      Alert.success("Signed In Successfully", 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const onGoogleSignIn = () => {
    signIn(new firebase.auth.GoogleAuthProvider());
  };
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={12}>
          <div className="mt-page">
            <div className="text-center">
              <h2>Welcome to chat app</h2>
              <p>Progressive chat platform for neophytes</p>
            </div>

            <div className="text-center">
              <Button className={classes.google} onClick={onGoogleSignIn}>
                <Icon icon="google" className="mr-1" />
                Continue With Google
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignIn;
