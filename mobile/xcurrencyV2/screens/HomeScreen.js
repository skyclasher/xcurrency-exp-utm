import axios from 'axios';
import React from 'react';
import Reinput from 'reinput';
import {
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { StackNavigator } from 'react-navigation';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			foreignCurrency: '',
			foreignValue: '',
			toCurrency: '',
			toValue: 0,
			result: '',
			propUpd: false,
		  }
		  this.handleChange = this.handleChange.bind(this);
		  this.exchange = this.exchange.bind(this);
	  }
	  
	handleChange(key,val) {
        let change = {};
		change[key] = val;
		this.setState({...change, propUpd: true});
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

	componentDidMount(){
		const { navigation } = this.props;
		navigation.addListener('willFocus', () =>
		  this.retrieveData('foreign:currency')
			.then((val) => {
				//this callback is executed when your Promise is resolved
				this.setState({
					foreignCurrency: val, propUpd: true
				})
			})
		);

		this.retrieveData('base:currency')
		.then((val) => {
			//this callback is executed when your Promise is resolved
			this.setState({
				toCurrency: val
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

	exchange(){
		if(this.state.foreignValue == "")
			return false;
	
		axios({
			method: 'post',
			url: `http://xcurrency.syafiqanuar.my/api/Exchange`,
			data: {
				FromCurrency: this.state.foreignCurrency,
				FromValue: this.state.foreignValue,
				ToCurrency: this.state.toCurrency,
				ToValue: 0
			}
		}).then(res => {
			//if(res.status == 200) {
				this.setState({result: res.data, propUpd: true});
			//}
	});
	}
  
	static getDerivedStateFromProps(props, state) {
		const text = props.navigation.getParam('text');

		
		if (state.propUpd)
		{
			return {
				propUpd: false,
			}
		} else if (text != 'undefined' && !state.propUpd) {
			return {
				propUpd: true,
				foreignValue: text,
			}
		}
		//this.setState({ foreignValue: text });
		//console.warn(text);
	  }

render()
{
	// let scanVal = '';
	// const text = this.props.navigation.getParam('text');
	// scanVal = text;
	//this.handleChange('scanVal', text);
	// if(typeof this.props.navigation != "undefined")
	// {
	// 	if(typeof this.props.navigation.state != "undefined"){
	// 		if(typeof this.props.navigation.state.params != "undefined"){
	// 			if(typeof this.props.navigation.state.params.text != "undefined"){
	// 				scanVal = this.props.navigation.state.params.text;
	// 				//this.setState({clearFlag: true});
	// 			}
	// 		}
	// 	}
	// }
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/xcurrency.png')}
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

		  <Reinput fontSize={20} width='60' label='Foreign Value' color="blue" activeColor="green" value={this.state.foreignValue} onChangeText={val => this.handleChange('foreignValue', val)} />

		  <Button
			title="Exchange"
			onPress={this.exchange}
		  />

		  <View style={styles.bottomPart}>
			<Text style={styles.convertResult}>
				{this.state.result}
			</Text>
        </View>
        </View>

      </ScrollView>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
        </View>
    </View>
  );
}
}
HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    return (
      <Text style={styles.developmentModeText}>
        Easily convert currency in real-time when traveling.
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
	  Easily convert currency when travel in real time.
      </Text>
    );
  }
}


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 180,
    height: 130,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  convertResult: {
	flex: 1,
	fontSize: 28,
	color: 'rgba(96,100,109, 0.8)',
	marginTop: height/8
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  bottomPart: {
	flex: 1,
	height: height/3,
	width: width,
	justifyContent:'center',
    alignItems:'center',
	backgroundColor: '#fbfbfb',
	marginTop: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 0,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
