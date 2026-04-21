import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNav from './AuthNav';
import MainNav from './MainNav';

const Stack = createStackNavigator();

const RootNav = () => {
  const { isAuthenticated, token, user } = useSelector(state => state.auth);
  const loggedIn = !!token && !!user && isAuthenticated;

  console.log('RootNav - auth:', { isAuthenticated, token, user });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!loggedIn ? (
        <Stack.Screen name="Auth" component={AuthNav} />
      ) : (
        <Stack.Screen name="Main" component={MainNav} />
      )}
    </Stack.Navigator>
  );
};

export default RootNav;