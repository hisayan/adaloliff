import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import liff from "@line/liff";

const Liff = (props) => {
  console.log({ props });
  const { liffId, userId, displayName } = props;
  useEffect(() => {
    liff
      .init({ liffId })
      .then(() => {
        const isLoggedIn = liff.isLoggedIn();
        liff
          .getProfile()
          .then((profile) => {
            console.log("profile", profile);
            userId.onChange(profile.userId);
            displayName.onChange(profile.displayName);
            // const name = profile.displayName
            // const userId = profile.userId
          })
          .catch((err) => {
            console.log("error2", err);
          });
      })
      .catch((err) => {
        console.log("error1", err);
      });
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={{ color: "yellow" }}>{liffId}</Text>
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
