import React from "react";
import { Icon, Alert, Grid, Row, Col, Button } from "rsuite";
import { auth } from "../misc/firebase";
import firebase from "firebase/app";
import { database } from "../misc/firebase";

function SignIn() {
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
    <Grid>
      <Row>
        <Col xs={24} md={24}>
          <div className="mt-page">
            <div className="text-center">
              <h2>Welcome to chat app</h2>
              <p>Progressive chat platform for neophytes</p>
            </div>

            <div className="text-center mt-3">
              <Button color="blue" onClick={onGoogleSignIn}>
                <Icon icon="google" className="mr-1" />
                Continue With Google
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  );
}

export default SignIn;
