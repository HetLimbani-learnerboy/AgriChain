<<<<<<< HEAD
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
=======
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from '../Components/AppHeader';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* Custom header on top */}
      <AppHeader />

      {/* Tabs without default header */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#269b59",
          tabBarInactiveTintColor: "#8E8E93",
          headerShown: false, // <-- hide the default tab headers
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="farmer"
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="leaf-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="distributor"
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="car-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="retailer"
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="storefront-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="consumer"
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
>>>>>>> main
}
