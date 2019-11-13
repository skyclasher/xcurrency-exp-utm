import React, {PureComponent} from 'react';
import {StyleSheet, Dimensions, Text, View} from 'react-native';
import RNTextDetector from "react-native-text-detector";
import {RNCamera} from 'react-native-camera';
import Config from "react-native-config";

import { StackNavigator  } from 'react-navigation';

export default class ScanScreen extends React.Component {
	constructor(props: Props){
		super(props)
		this.state = {focusedScreen: false}
		console.warn('Config.API_URL ', Config.API_URL);
		this.renderCamera = this.renderCamera.bind(this);
	}
    takePicture = async () => {
		if (this.camera) {
			const data = await this.camera.takePictureAsync();
			
			const visionResp = await RNTextDetector.detectFromUri(data.uri);
			if (!(visionResp && visionResp.length > 0)) {
				throw "UNMATCHED";
			}

			let text = '';
			if(typeof visionResp != "undefined" && visionResp != null){
				if (visionResp.length > 0 && typeof visionResp[0].text != "undefined") {
					text =  visionResp[0].text;
				 }
			}
			this.props.navigation.navigate("Home", {text});
		}
	}
	
	componentDidMount() {
		const { navigation } = this.props;
		navigation.addListener('willFocus', () =>
		  this.setState({ focusedScreen: true })
		);
		navigation.addListener('willBlur', () =>
		  this.setState({ focusedScreen: false })
		);
	}

	renderCamera = () => {
		if(this.state.focusedScreen ){
		  return(
			<RNCamera
				ref={ref => {
					this.camera = ref;
				}}
				style={styles.preview}
				type={RNCamera.Constants.Type.back}
				flashMode='off'//{this.state.flashMode}
				autoFocus={RNCamera.Constants.AutoFocus.on}
				androidCameraPermissionOptions={{
					title: 'Permission to use camera',
					message: 'Enable camera to be able to scan tag price',
					buttonPositive: 'Ok',
					buttonNegative: 'Cancel',
				}}
				captureAudio={false}
				>
				<Text style={styles.capture} onPress={this.takePicture.bind(this)}> [CAPTURE]</Text>
			</RNCamera>
		  );
		}else {
		  return null;
		}
	  }

    render() {
		// const { navigate } = this.props.navigation;
		// console.warn(navigate);
      return (
        <View style={styles.container}>
			{this.renderCamera()}
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
	  backgroundColor: '#F5FCFF',
    },
    preview: { 
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: Dimensions.get('window').height,
	  width: Dimensions.get('window').width,
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      color: '#000',
      padding: 10,
      margin: 40
    }
  });
  
  ScanScreen.navigationOptions = {
	title: 'Scan tag',
  };