// app/_layout.tsx
import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../Components/AppHeader";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../i18n"; // your i18n setup

export default function RootLayout() {
  // Hook must be inside a provider, so we wrap everything in I18nextProvider
  return (
    <I18nextProvider i18n={i18n}>
      <View style={{ flex: 1 }}>
        <AppHeader />

        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#269b59",
            tabBarInactiveTintColor: "#8E8E93",
          }}
        >
          <Tabs.Screen
            name="LandingPage"
            options={{
              title: "Landing",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="planet-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Farmerpage"
            options={{
              title: "Farmer",
              tabBarLabel: "Farmer",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="leaf-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Distributorpage"
            options={{
              title: "Distributor",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="car-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="Retailerpage"
            options={{
              title: "Retailer",
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="storefront-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Consumerpage"
            options={{
              title: "Consumer",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </I18nextProvider>
  );
}