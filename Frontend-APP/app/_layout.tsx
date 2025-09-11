import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#269b59",
        tabBarInactiveTintColor: "#8E8E93",
        headerStyle: { backgroundColor: "#ECFCF2" },
        headerTintColor: "#269b59",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          
          title: "AgriChain",
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="farmer"
        options={{
          title: "Farmer",
          tabBarIcon: ({ color, size }) => <Ionicons name="leaf-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="distributor"
        options={{
          title: "Distributor",
          tabBarIcon: ({ color, size }) => <Ionicons name="car-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="retailer"
        options={{
          title: "Retailer",
          tabBarIcon: ({ color, size }) => <Ionicons name="storefront-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="consumer"
        options={{
          title: "Consumer",
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}