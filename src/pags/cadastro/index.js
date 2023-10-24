import React, {useState} from 'react';
import { Ionicons} from 'react-native-vector-icons'
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import firebase from '../firebase';

export default function Cadastro(props) {
    
    const logo = require('../../../assets/logo.png')
    const [VerSenha, setVerSenha] = useState(true)
    const [VerConfirmarSenha, setVerConfirmarSenha] = useState(true)
    const [ColorBtn, setColorBtn] = useState("#334f7c")
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [ConfirmarSenha, setConfirmarSenha] = useState('')

    function fazerCadastro(){
      if(senha === ConfirmarSenha && senha !== "" && ConfirmarSenha !== ""){
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((value) => {
          setColorBtn('#334f7c')
          Alert.alert("Conta criada", `Bem vindo: ${value.user.email}`)
          setEmail('')
          setSenha('')
          setConfirmarSenha('')
        })
        .catch((error) => {
          setColorBtn('#a72836')
          Alert.alert("Erro", `algo deu errado, confirme os dados e tente novamente`)
        })  
      } else if(email === "" && senha === "" && ConfirmarSenha === ""){
        setColorBtn('#a72836d')
        Alert.alert('Dados não Inseridos', 'Você não inseriu os dados, insira os daods e tente novamente!')
      } else {
        setColorBtn('#a72836')
        Alert.alert("Erro", "As senhas precisam ser iguais!")
      }

    }

    return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#839deb" />
          <View>
            <Image style={styles.logo} source={logo}></Image>
            <Text style={styles.Text}>Email</Text>
            <TextInput
              placeholderTextColor={ColorBtn}
              style={styles.Input}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />
     
            <Text style={styles.Text}>Senha</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                secureTextEntry={VerSenha}
                placeholderTextColor={ColorBtn}
                style={styles.Input}
                placeholder="Senha"
                onChangeText={(text) => setSenha(text)}
              />
              <TouchableOpacity
               style={styles.Icon} 
               onPress={() => setVerSenha(!VerSenha)}
              >
               <Ionicons name={VerSenha === true? 'eye': 'eye-off'} color='#344f7c' size={35}/>
              </TouchableOpacity>
              
            </View>

            <Text style={styles.Text}>Confirmar senha</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                secureTextEntry={VerConfirmarSenha}
                placeholderTextColor={ColorBtn}
                style={styles.Input}
                placeholder="Senha"
                onChangeText={(text) => setConfirmarSenha(text)}
              />
              <TouchableOpacity
               style={styles.Icon} 
               onPress={() => setVerConfirmarSenha(!VerConfirmarSenha)}
              >
               <Ionicons name={VerConfirmarSenha === true? 'eye': 'eye-off'} color='#344f7c' size={35}/>
              </TouchableOpacity>
              
            </View>

            <TouchableOpacity 
            style={[styles.btn, {backgroundColor: ColorBtn}]}
            onPress={()=> fazerCadastro()}
            >
              <Text style={{color: '#fff'}}>Fazer cadastro</Text>
            </TouchableOpacity>
          </View>
          <Text></Text>
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
      height: 50,
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
      width: 140,
      height: 45,
      marginLeft: 70,
      borderRadius: 14,
    },
    Icon: {
      marginTop: 6,
      marginLeft: -44,
    }
  });