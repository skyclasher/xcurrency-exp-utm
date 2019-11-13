import React, { Component } from 'react';
import Modal from 'react-native-modalbox';
import Reinput from 'reinput';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  TouchableNativeFeedback,
  Alert,
  Button,
} from 'react-native';

import * as css from "../assets/Styles";

export default class SettingsScreen extends React.Component {
	constructor() {
		super();

		this.state = {
			modalVisible: false,
			item: [],
			baseCurrency: '',
			foreignCurrency: '',
			key: '',
			refresh: false
		  };

		this.storeData = this.storeData.bind(this);
		this.retrieveData = this.retrieveData.bind(this);
		this.renderRow = this.renderRow.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.save = this.save.bind(this);

		var rr = '';

		this.retrieveData('base:currency')
		.then((val) => {
			//this callback is executed when your Promise is resolved
			this.setState({
				baseCurrency: val
				});
		});

		this.retrieveData('foreign:currency')
		.then((val) => {
			//this callback is executed when your Promise is resolved
			this.setState({
				foreignCurrency: val
				});
		});
	}

	componentDidMount(){
		this.listData = [
			{
				key: 'base:currency',
				title: 'Base Currency',
				currency: this.state.baseCurrency,
			  },
			  {
				key: 'foreign:currency',
				title: 'Foreign Currency',
				currency: this.state.foreignCurrency,
			  },
		];
	}

	storeData = async () => {
		try {
		  await AsyncStorage.setItem(this.state.key, this.state.item.currency)
		  .then(x => AsyncStorage.getItem(this.state.key))
		  .then((val) => { 
			  if(this.state.key == 'base:currency') {
				this.setState({ baseCurrency: this.state.item.currency});
			  } else {
				this.setState({ foreignCurrency: this.state.item.currency});
			  }
		  })
		} catch (error) {
		  // Error saving data
		}
	}
	  
	retrieveData = async function (key) {
		try {
		  const val = await AsyncStorage.getItem(key);
		  if (val !== null) {
			// We have data!!
      		return val;
		  }
		 } catch (error) {
		   // Error retrieving data
			console.warn(error);
		 }
	}

	handleChange(val) {
        this.setState({
			item: {
					key: this.state.item.key,
					title: this.state.item.title,
					currency: val,
				}
		});
	}

	renderRow({item}) {
		const title = `${item.title}`;
		const currency = `${item.currency}`;
	   
		let actualRowComponent =
		  <View style={css.home_screen_list.row}>
			<View style={css.home_screen_list.row_cell_timeplace}>
			  <Text style={css.home_screen_list.row_time}>{title}</Text>
			  <Text style={css.home_screen_list.row_place}>{currency}</Text>
			</View>
		  </View>;
	   
	   let touchableWrapperIos =
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor={css.colors.transparent_white}
        onPress={
          () => {
			this.refs.modal3.open();
			this.setState({item: {...item}});
			this.setState({key: item.key});
			//this._navigation.navigate("DetailsRoute", {...item});
          }
        }
      >
        {actualRowComponent}
      </TouchableHighlight>;
	
		let touchableWrapperAndroid =
		<TouchableNativeFeedback
			useForeground={true}
			background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
			onPress={
			() => {
				this.refs.modal3.open()
				this.setState({item: {...item}});
				this.setState({key: item.key});
				//this._navigation.navigate("DetailsRoute", {...item});
			}
			}
		>
			{actualRowComponent}
		</TouchableNativeFeedback>;
	
		if (require('react-native').Platform.OS === 'ios') {
		return touchableWrapperIos;
		}
		else return touchableWrapperAndroid;
	  }

	  setModalVisible(visible) {
		this.setState({modalVisible: visible});
	  }

	  save() {
		this.setState({ 
			refresh: !this.state.refresh
		});
		this.storeData();
		this.refs.modal3.close();
	  }

	  render() {
		return (
			<View style={css.home_screen.v_container}>

			<Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"}>
				<Text style={styles.text}>Change {this.state.item.title}</Text>
				<Reinput style={styles.text} value={this.state.item.currency} onChangeText={val => this.handleChange(val)} />
				<Button title={`Save`} onPress={this.save} style={styles.btn}/>
				<Button title={`Cancel`} onPress={() => this.refs.modal3.close()} style={styles.btn}/>
			</Modal>

			<StatusBar
				hidden={false}
				translucent={false}
				animated={true}
				barStyle={'light-content'}
				backgroundColor={css.colors.secondary}
				/>
			
			<FlatList
					style={css.home_screen_list.container}
					data={[
						{
							key: 'base:currency',
							title: 'Base Currency',
							currency: this.state.baseCurrency,
						  },
						  {
							key: 'foreign:currency',
							title: 'Foreign Currency',
							currency: this.state.foreignCurrency,
						  },
					]}
					extraData={this.state.refresh}
					renderItem={this.renderRow}
			/>
			
			</View>
		);
	}
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

const styles = StyleSheet.create({

	wrapper: {
	  paddingTop: 50,
	  flex: 1
	},
	modal3: {
	  height: 300,
	  width: 300
	},
  
	btn: {
	  margin: 10,
	  backgroundColor: "#3B5998",
	  color: "white",
	  padding: 10
	},
  
	btnModal: {
	  position: "absolute",
	  top: 0,
	  right: 0,
	  width: 50,
	  height: 50,
	  backgroundColor: "transparent"
	},
  
	text: {
	  color: "black",
	  fontSize: 22
	}
  
  });