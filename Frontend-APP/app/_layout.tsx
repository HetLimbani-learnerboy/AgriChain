import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from '../Components/AppHeader';
import { View } from 'react-native';
import "../i18n"; 
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../i18n";

export default function RootLayout() {
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <View style={{ flex: 1 }}>
        <AppHeader />

        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#269b59",
            tabBarInactiveTintColor: "#8E8E93",
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarLabel: t("Home"),
              tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="farmer"
            options={{
              tabBarLabel: t("Farmer"),
              tabBarIcon: ({ color, size }) => <Ionicons name="leaf-outline" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="distributor"
            options={{
              tabBarLabel: t("Distributor"),
              tabBarIcon: ({ color, size }) => <Ionicons name="car-outline" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="retailer"
            options={{
              tabBarLabel: t("Retailer"),
              tabBarIcon: ({ color, size }) => <Ionicons name="storefront-outline" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="consumer"
            options={{
              tabBarLabel: t("Consumer"),
              tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
            }}
          />
        </Tabs>
      </View>
    </I18nextProvider>
  );
}
