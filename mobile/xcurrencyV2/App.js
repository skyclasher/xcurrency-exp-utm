/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
	<View style={styles.container}>
	{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
	<AppNavigator />
  </View>
  );
};

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	},
  });

export default App;
