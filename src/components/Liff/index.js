import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import liff from "@line/liff";

const Liff = (props) => {
  // const [liffObject, setLiffObject] = useState;
  // console.log({ props });
  const { liffId, userId, displayName } = props;
  const [liffInitialized, setLiffInitialized] = useState(false);
  useEffect(() => {
    // liff.ready.then(() => {
    //   if (liff.isLoggedIn()) {
    //     const context = liff.getContext();
    //     const liffToken = liff.getAccessToken();
    //     setUid(context.userId);
    //     setAccessToken(liffToken);
    //   }
    // });

    if (liffId && !liffInitialized) {
      console.log({ liffId, userId, displayName });
      liff
        .init({ liffId, withLoginOnExternalBrowser: true })
        .then(() => {
          setLiffInitialized(true);
          const isLoggedIn = liff.isLoggedIn();
          console.log({isLoggedIn})
          if (isLoggedIn) {
            liff
              .getProfile()
              .then((profile) => {
                console.log("profile", profile);
                if (profile.userId != userId.value) {
                  userId.onChange(profile.userId);
                  displayName.onChange(profile.displayName);
                }
                // const name = profile.displayName
                // const userId = profile.userId
              })
              .catch((err) => {
                console.log("error2", err);
              });
          }
        })
        .catch((err) => {
          console.log("error1", err);
        });
    }
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={{ color: "green", display: props.editor ? "unset" : "none" }}>
        {liffId}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Liff;
