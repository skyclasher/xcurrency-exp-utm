import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ScanScreen from '../screens/ScanScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
	tabBarLabel: 'Exchange',
	tabBarIcon: ({ focused }) => (
	  <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-repeat' : 'md-repeat'} />
	),
};

HomeStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const ScanStack = createStackNavigator(
  {
	Scan: ScanScreen
  },
  config,
);

ScanStack.navigationOptions = {
	tabBarLabel: 'Scan',
	tabBarIcon: ({ focused }) => (
	  <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-qr-scanner' : 'md-qr-scanner'} />
	),
};

ScanStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ScanStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
