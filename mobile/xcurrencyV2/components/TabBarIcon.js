import React from 'react';
import Icon   from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Icon 
      name={props.name}
      size={26}
      //style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
	//<Icon name={props.name} size={26} color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault} />
	//<Icon name="ios-person" size={30} color="#4F8EF7" />
  );
}
