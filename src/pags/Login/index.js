import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons} from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import firebase from './firebase';

export default function Login() {
 const auth = getAuth();

 const [Email, setEmail] = useState('')
 const [Senha, setSenha] = useState('')
 const [VerSenha, setVerSenha] = useState(false)
 const logo = require('../../../assets/logo.png');
 const navigation = useNavigation();
 const [ColorBtn, setColorBtn] = useState("#334f7c")

 async function fazerLogin(){
  signInWithEmailAndPassword(auth, Email, Senha)
  .then((user) => {
    setColorBtn("#334f7c")
    navigation.navigate('Tasks')
  })
  .catch((error) => {
    setColorBtn('#ff0000')
  })
 }

 return (
   <View style={styles.container}>
     <StatusBar backgroundColor="#839deb" />
     <View>
       <Image style={styles.logo} source={logo}></Image>

       <Text style={styles.Text}>Usuario</Text>
       <TextInput
         placeholderTextColor="#fff"
         style={styles.Input}
         placeholder="Usuario"
         onChangeText={(text) => setEmail(text)}
       />

       <Text style={styles.Text}>Senha</Text>
       <View style={{ flexDirection: "row" }}>
         <TextInput
           secureTextEntry={VerSenha}
           placeholderTextColor="#fff"
           style={styles.Input}
           placeholder="Senha"
           onChangeText={(text) => setSenha(text)}
         />
         <TouchableOpacity
          style={styles.Icon} 
          onPress={() => setVerSenha(!VerSenha)}
         >
          <Ionicons name={VerSenha === true? 'eye': 'eye-off'} color='#fff' size={25}/>
         </TouchableOpacity>
       </View>
       <TouchableOpacity 
       style={[styles.btn, {backgroundColor: ColorBtn}]}
       onPress={()=> fazerLogin()}
       >
         <Text style={{color: '#fff'}}>Login</Text>
       </TouchableOpacity>
     </View>
     <TouchableOpacity
     onPress={() => navigation.navigate('Cadastro')}
     >
      <Text style={styles.TextCadastro}>Não possui conta? cadastre-se</Text>
     </TouchableOpacity>
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#839deb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: -150,
    width: 300,
    height: 300,
  },
  Text: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
    marginBottom: 2,
  },
  Input: {
    backgroundColor: '#b6b9b4',
    width: 280,
    height: 34,
    paddingLeft: 10,
    paddingRight: 55,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1d44b8',
    marginBottom: 20,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 45,
    marginLeft: 90,
    borderRadius: 18,
  },
  Icon: {
    marginTop: 4,
    marginLeft: -34,
  },
  TextCadastro: {
    color: '#1d44b8',
    marginTop: 20
  }
});
