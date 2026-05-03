import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { ROUTES } from '../utils';

// Screens
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HomeStackParamList = any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OrdersStackParamList = any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MainTabParamList = any;

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<HomeStackParamList | OrdersStackParamList>();

// Home Stack (Products + Product Detail)
const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ROUTES.PRODUCTS} component={ProductsScreen} />
    <Stack.Screen name={ROUTES.PRODUCT_DETAIL} component={ProductDetailScreen} />
  </Stack.Navigator>
);

// Orders Stack (Orders + Order Detail)
const OrdersStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ROUTES.ORDERS} component={OrdersScreen} />
    <Stack.Screen name={ROUTES.ORDER_DETAIL} component={OrderDetailScreen} />
  </Stack.Navigator>
);

// Tab Icon Component
interface TabIconProps {
  emoji: string;
  label: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ emoji, focused }) => (
  <Text style={{ fontSize: focused ? 28 : 24, opacity: focused ? 1 : 0.7 }}>
    {emoji}
  </Text>
);

const MainNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#FF6B9D',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#FF6B9D',
        tabBarInactiveTintColor: '#636E72',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🍦" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStack}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📦" focused={focused} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.CART}
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🛒" focused={focused} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;