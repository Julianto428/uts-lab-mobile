import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#74A4FC', // Warna biru lembut saat tab aktif
        tabBarInactiveTintColor: '#8FA1B4', // Warna abu-abu saat non-aktif
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Latar belakang putih bersih
          borderTopWidth: 0, // Menghilangkan garis batas kaku di atas
          elevation: 15, // Efek bayangan (Android)
          shadowColor: '#8FA1B4', // Warna bayangan (iOS)
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 15,
          height: 65, // Membuat bar sedikit lebih tinggi agar lega
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'compass' : 'compass-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}