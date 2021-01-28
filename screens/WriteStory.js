import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import db from '../config.js';

export default class WriteScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal',
        scannedBookId: '',
        scannedStudentId: ''
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState} = this.state
      if(buttonState === "BookId"){
        this.setState({
          scanned: true,
          scannedData: data,
          buttonState: 'normal'
        });
      }else if(buttonState === "StudentId"){
        this.setState({
          scanned: true,
          scannedData: data,
          buttonState: 'normal'
        });
      }
    }

    handleTransaction = () => {
      var transactionMessage
      db.collection("books").doc(this.state.scannedBookId).get()
      .then((doc) => {
        console.log(doc.data())
      })
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState === "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }
      else if (buttonState === "normal"){
        return(
        <View style={styles.container}>
          <View>
            <Text style={{textAlign: 'center', fontSize: 30, backgroundColor: 'pink'}}>
              Story Hub
            </Text>
          </View>

          <View style={styles.inputView}>
            <TextInput style={styles.inputButton} placeholder="Story Title"/>
          </View>

          <View style={styles.inputView}>
            <TextInput style={styles.inputButton} placeholder="Author"/>
          </View>

          <View style={styles.inputView}>
            <TextInput style={styles.inputButton} placeholder="Write your story"/>
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    inputButton: {
      width: 200,
      height: 60,
      alignItems: 'center',
    },
    inputView: {
      flexDirection: 'row',
      margin: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    },
    submitButtonText: {
      textAlign: 'center',
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
      marginTop: 10,
    },
    submitButton: {
      backgroundColor: 'pink',
      width: 100,
      height: 50,
      alignItems: 'center'
    },
  });