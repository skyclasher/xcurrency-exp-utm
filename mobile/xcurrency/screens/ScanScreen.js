import React, {PureComponent} from 'react';
import {StyleSheet, Dimensions, Text, View} from 'react-native';
import RNTextDetector from "react-native-text-detector";
import {RNCamera} from 'react-native-camera';
import Config from "react-native-config";

 class Scan extends PureComponent {
	constructor(){
		super()
		console.warn('Config.API_URL ', Config.API_URL);
	}
    takePicture = async () => {
		if (this.camera) {
			const data = await this.camera.takePictureAsync();
			console.warn('takePictureResponse ', data);
			const visionResp = await RNTextDetector.detectFromUri(data.uri);
			if (!(visionResp && visionResp.length > 0)) {
				throw "UNMATCHED";
			}
			console.warn('text ', visionResp);
		}
    }

    render() {
      return (
        <View style={styles.container}>

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
				<Text style={styles.capture} onPress={this.takePicture.bind(this)}> [CAPTURE CARD]</Text>
			</RNCamera>
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

  export default function ScanScreen() {
	return (
		<Scan />
	);
  }
  
  ScanScreen.navigationOptions = {
	title: 'Scan tag',
  };