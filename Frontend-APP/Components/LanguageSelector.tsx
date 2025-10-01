import React from "react";
import { View, Button, StyleSheet } from "react-native";
import i18n from "../i18n";

export default function LanguageSelector() {
  return (
    <View style={styles.container}>
      <Button title="EN" onPress={() => i18n.changeLanguage("en")} />
      <Button title="HI" onPress={() => i18n.changeLanguage("hi")} />
      <Button title="GU" onPress={() => i18n.changeLanguage("gu")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
});
