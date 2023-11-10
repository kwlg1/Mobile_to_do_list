import React, {useId, useState} from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather, Ionicons } from 'react-native-vector-icons';
import firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';


export default function Cadastro() {
    
    const logo = require('../../../assets/logo.png');
    const [VerSenha, setVerSenha] = useState([true, true]);
    const [ColorBtn, setColorBtn] = useState("#334f7c");
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [ConfirmarSenha, setConfirmarSenha] = useState('');
    const navigation = useNavigation();

    async function CriarBanco(){
      const tarefas = [
        {nome: 'Sem tarefas', desc: 'Ainda sem tarefas, Adcione uma tarefa', concluido: false}
      ]
      const uid = firebase.auth().currentUser.uid

      firebase.database().ref('User').child(uid)
      firebase.database().ref("User/"+uid).set(JSON.stringify(tarefas))
    }
     async function fazerCadastro(){
      if(senha === ConfirmarSenha && senha !== "" && ConfirmarSenha !== ""){
        await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((value) => {
          setColorBtn('#2b872d7c')
          CriarBanco()
          setEmail('')
          setSenha('')
          setConfirmarSenha('') 
          navigation.navigate('Tela')
        })
        .catch((error) => {
          setColorBtn('#a72836')
          if( error.code === 'auth/weak-password'){
            Alert.alert('Senha', 'sua senha precisar ter pelo menos 6 caracteres.')
          } 
          if (error.code === 'auth/invalid-email'){
            Alert.alert('Email', 'Email incorreto!')
          }
          if(error.code === 'auth/email-already-in-use' ){
            Alert.alert('email', 'O endereço de email digitado já está cadastrado!')
          }
        })  
      } else if(email === "" && senha === "" && ConfirmarSenha === ""){
        setColorBtn('#a72836')
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
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
     
            <Text style={styles.Text}>Senha</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                secureTextEntry={VerSenha[0]}
                placeholderTextColor={ColorBtn}
                color='#fff'
                style={styles.Input}
                placeholder="Senha"
                value={senha}
                onChangeText={(text) => setSenha(text)}
              />
              <TouchableOpacity
               style={styles.Icon} 
               onPress={() => setVerSenha([!VerSenha[0], VerSenha[1]])}
              >
               <Ionicons name={VerSenha[0] === true? 'eye': 'eye-off'} color='#344f7c' size={35}/>
              </TouchableOpacity>
              
            </View>

            <Text style={styles.Text}>Confirmar senha</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                secureTextEntry={VerSenha[1]}
                placeholderTextColor={ColorBtn}
                color='#fff'
                style={styles.Input}
                placeholder="Senha"
                value={ConfirmarSenha}
                onChangeText={(text) => setConfirmarSenha(text)}
              />
              <TouchableOpacity
               style={styles.Icon} 
               onPress={() => setVerSenha([VerSenha[0],!VerSenha[1]])}
              >
               <Ionicons name={VerSenha[1] === true? 'eye': 'eye-off'} color='#344f7c' size={35}/>
              </TouchableOpacity>
              
            </View>

            <TouchableOpacity 
            style={[styles.btn, {backgroundColor: ColorBtn}]}
            onPress={()=> fazerCadastro()}
            >
              <Text style={{color: '#fff'}}>Fazer cadastro</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.SairCadastro}
            onPress={() => navigation.navigate('Login')}
          >
            <Feather name='log-out' color='#344f7c' size={42} />   
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
    },
    SairCadastro: {
      position: 'absolute',
      top: 12,
      left: 12,
    }
  });