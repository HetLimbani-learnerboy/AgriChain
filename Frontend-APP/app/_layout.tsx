// app/_layout.tsx
import React from "react";
import { SafeAreaView } from "react-native";
import { Tabs } from "expo-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n"; // your i18n setup
import AppHeader from "../Components/AppHeader";

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fdfbf5" }}>
        <AppHeader />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: "none" }, // Hides footer completely
          }}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="GetStartedPage" />
          <Tabs.Screen name="Farmerpage" />
          <Tabs.Screen name="Distributorpage" />
          <Tabs.Screen name="Retailerpage" />
          <Tabs.Screen name="Consumerpage" />
        </Tabs>
      </SafeAreaView>
    </I18nextProvider>
  );
}
