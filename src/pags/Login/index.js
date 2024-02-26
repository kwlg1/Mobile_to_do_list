import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, Feather, EvilIcons } from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase'

export default function Login() {


  const [Email, setEmail] = useState('');
  const [Senha, setSenha] = useState('');
  const [VerSenha, setVerSenha] = useState(true);
  const [ColorBtn, setColorBtn] = useState('#334f7c');
  const navigation = useNavigation();
  const logo = require('../../../assets/logo.png');

  async function fazerLogin() {
    await firebase.auth().signInWithEmailAndPassword(Email, Senha)
      .then(() => {
          setColorBtn("#334f7c")
      })
      .catch((error) => {
        setColorBtn("#A72836")
        Alert.alert("Erro", `Email ou senha incorreto!`)
      })
  }

  async function resetPassword(){
    if(Email === ''){
      Alert.alert("Email não digitado", "Insira um endereço de email")
    }else {
      firebase.auth().sendPasswordResetEmail(Email)
      .then(() => {
        Alert.alert("Email enviado", "Verifique sua caixa de entrada")
      })
      .catch((error) => {
        if(error.code === 'auth/invalid-email'){
          Alert.alert("Erro", `Email não cadastrado, Cadastre-se!`)
        }
      })
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#11114e"/>
      <Image style={styles.logo} source={logo}></Image>

      <View style={styles.BoxForm}>
        <Text style={styles.TextAcessar}>Acesse sua conta</Text>

        <View style={styles.User}>

          <Feather style={styles.IconUser} name='user' color='#022b42' size={30} />
          <Text style={[styles.Text, {top: 30, left: 38}]}>{Email.length === 0? "Email": ""}</Text>
          <TextInput
            color='#022b42'
            style={styles.Input}
            value={Email}
            onChangeText={(text) => setEmail(text)}
          />

        </View>

        <View style={styles.Password}>
          <EvilIcons style={styles.IconPassword} name='lock' color='#022b42' size={50} />
          <Text style={[styles.Text, {top: 30, left: 38}]}>{Senha.length === 0? " Password": ""}</Text>
          <TextInput
            secureTextEntry={VerSenha}
            placeholderTextColor={ColorBtn}
            color='#022b42'
            style={styles.Input}
            value={Senha}
            onChangeText={(text) => setSenha(text)}
          />
          <TouchableOpacity
            style={styles.ShowPassword}
            onPress={() => setVerSenha(!VerSenha)}
          >
            <Ionicons name={VerSenha === true ? 'eye' : 'eye-off'} color='#022b42' size={30} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: ColorBtn }]}
          onPress={() => fazerLogin()}
        >
          <Text style={{ color: '#fff' }}>Login</Text>
        </TouchableOpacity>
      
        <Text style={{marginBottom: 20}}>Ou</Text>

      <TouchableOpacity
          style={[styles.btn, {marginBottom: 2}]}
          onPress={() => resetPassword()}
        >
          <Text style={{ color: '#fff' }}>Esqueci a senha</Text>
       </TouchableOpacity>
       
       <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={{ color: '#fff' }}>Cadastrar uma conta</Text>
       </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#11114e',
  },
  BoxForm: {
    backgroundColor: '#839deb',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 500,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  logo: {
    bottom: 80,
    width: 280,
    height: 90,
  },
  Input: {
    width: 280,
    height: 50,
    paddingTop: 26,
    paddingLeft: 40,
    paddingRight: 42,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#334f7c',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,

  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#334f7c',
    width: 280,
    height: 45,
    marginTop: 4,
    marginBottom: 20,
    borderWidth: 0.9,
    borderColor: '#b6b9b4',
    borderRadius: 10,

  },
  ShowPassword: {
    top: 18,
    marginLeft: -34,
  },
  TextAcessar: {
    position: 'absolute',
    top: 50,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#022b42'
  },
  TextCadastro: {
    color: '#022b42',
    marginBottom: 30,
    marginTop: 40,
    fontSize: 14,  
  },
  TextRedefinir: {
    color: '#022b42',
    backgroundColor: '#839deb',
    marginBottom: 10,
    marginTop: 40,
    fontSize: 14,
  },
  Viewline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 350,
    marginTop: 20
  },
  Text: {
    position: 'absolute',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#022b42',
  },
  User: {
    flexDirection: 'row'
  },
  Password: {
    flexDirection: 'row',
  },
  IconUser: {
    position: 'absolute',
    top: 16,
    left: 4,
  },
  IconPassword: {
    position: 'absolute',
    top: 6,
    left: -6,
  }


});
