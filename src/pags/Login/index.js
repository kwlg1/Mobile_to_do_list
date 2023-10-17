import React from 'react';
import { View, Text, StyleSheet, Button, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
 
 const logo = require('../../../assets/logo.png');
 const navigation = useNavigation();

 return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#000'/>
      <Image style={styles.logo} source={logo}></Image>
      <Text style={styles.Text}>Usuario</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: 100,
  }
});
