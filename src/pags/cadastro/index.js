import React, { useRef, useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, Alert, Animated, } from 'react-native';
import { Feather, Ionicons, EvilIcons } from 'react-native-vector-icons';
import firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {

  const logo = require('../../../assets/logo.png');
  const [VerSenha, setVerSenha] = useState([true, true]);
  const [ColorBtn, setColorBtn] = useState("#11114e");
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [ConfirmarSenha, setConfirmarSenha] = useState('');
  const heightBox  = useRef(new Animated.Value(0)).current
  const TopForm = useRef(new Animated.Value(500)).current
  const LogoAnimated = useRef(new Animated.Value(0)).current
  const MoveLogo = useRef(new Animated.Value(0)).current
  const OpacityAnimated = useRef(new Animated.Value(0)).current


  const navigation = useNavigation();

  async function CriarBanco() {
    const tarefas = [
      { id: Date.now(), nome: 'Sem tarefas', desc: 'Ainda sem tarefas, Adicione uma tarefa', data: `${date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()} / ${date.getMonth() <= 9 ? '0' + Number(date.getMonth() + 1) : Number(date.getMonth() + 1)} / ${date.getFullYear()}`, concluido: false }
    ]
    const uid = firebase.auth().currentUser.uid

    firebase.database().ref('User').child(uid)
    firebase.database().ref("User/" + uid).set(JSON.stringify(tarefas))
  }
  async function fazerCadastro() {
    if (senha === ConfirmarSenha && senha !== "" && ConfirmarSenha !== "") {
      await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(() => {
          CriarBanco()
          setColorBtn('#11114e')
        })
        .catch((error) => {
          setColorBtn('#a72836')
          if (error.code === 'auth/weak-password') {
            Alert.alert('Senha', 'sua senha precisar ter, pelo menos, 6 caracteres.')
          }
          if (error.code === 'auth/invalid-email') {
            Alert.alert('Email', 'Email incorreto!')
          }
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('email', 'O endereço de email digitado já está cadastrado!')
          }
        })
    } else if (email === "" && senha === "" && ConfirmarSenha === "") {
      setColorBtn('#a72836')
      Alert.alert('Dados não inseridos', 'Você não inseriu os dados, insira os dados e tente novamente!')
    } else {
      setColorBtn('#a72836')
      Alert.alert("Erro", "As senhas precisam ser iguais!")
    }

  }

  useEffect(() => {
    Animated.decay(heightBox, {
      velocity: 0.91,
      deceleration: 0.998,
      useNativeDriver: false
    }).start()

      Animated.timing(TopForm, {
        toValue: 0,
        duration: 2000,
        delay: 500,
        useNativeDriver: false
      }).start()
    
      Animated.loop(
        Animated.sequence([
          Animated.timing(LogoAnimated, {
            toValue: 1,
            duration: 3000,
            delay: 1000,
            useNativeDriver: false
          }),
          Animated.decay(MoveLogo, {
            velocity: 0.35,
            deceleration: 0.998,
            useNativeDriver: false
          }),
          Animated.timing(LogoAnimated, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: false
          }),
          Animated.timing(LogoAnimated, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false
          }),
          Animated.decay(MoveLogo, {
            velocity: -0.35,
            deceleration: 0.998,
            delay: 1000,
            useNativeDriver: false
          }),
          Animated.timing(LogoAnimated, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: false
          })
        ])
      ).start()
    
      Animated.timing(OpacityAnimated, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false
      }).start()
    
  }, [])

  return (
    <Animated.View style={[styles.container, {opacity: OpacityAnimated}]}>
      <StatusBar backgroundColor="#11114e" />

      <TouchableOpacity
        style={styles.SairCadastro}
        onPress={() => navigation.replace('Login')}
      >
        <Feather name='log-out' color='#839deb' size={38} />
      </TouchableOpacity>

      <Animated.Image style={[styles.logo, { opacity: LogoAnimated, left: MoveLogo }	]} source={logo}></Animated.Image>

      <Animated.View style={{
        backgroundColor: '#839deb',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: heightBox,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

      }}>
        <Text style={styles.TextCadastrar}>{'Insira os dados para realizar\n seu cadastro'}</Text>

        <Animated.View style={{
          top: TopForm,
          alignItems: 'center'
        }}>

          <View style={styles.User}>

            <Feather style={styles.IconUser} name='user' color='#022b42' size={30} />
            <Text style={[styles.Text, { top: 30, left: 38 }]}>{email.length === 0 ? "Email" : ""}</Text>
            <TextInput
              color='#022b42'
              style={styles.Input}
              value={email}
              autoCapitalize='none'
              selectionColor='#022b42'
              onChangeText={(text) => setEmail(text)}
            />

          </View>

          <View style={styles.Password}>
            <EvilIcons style={styles.IconPassword} name='lock' color='#022b42' size={50} />
            <Text style={[styles.Text, { top: 30, left: 38 }]}>{senha.length === 0 ? "Senha" : ""}</Text>
            <TextInput
              secureTextEntry={VerSenha[0]}
              placeholderTextColor={ColorBtn}
              color='#022b42'
              style={styles.Input}
              value={senha}
              selectionColor='#022b42'
              onChangeText={(text) => setSenha(text)}
              autoCapitalize='none'
            />
            <TouchableOpacity
              style={styles.ShowPassword}
              onPress={() => setVerSenha([!VerSenha[0], VerSenha[1]])}
            >
              <Ionicons name={VerSenha[0] === true ? 'eye' : 'eye-off'} color='#022b42' size={30} />
            </TouchableOpacity>
          </View>

          <View style={styles.Password}>
            <EvilIcons style={styles.IconPassword} name='lock' color='#022b42' size={50} />
            <Text style={[styles.Text, { top: 30, left: 38 }]}>{ConfirmarSenha.length === 0 ? " Confirmar Senha" : ""}</Text>
            <TextInput
              secureTextEntry={VerSenha[1]}
              placeholderTextColor={ColorBtn}
              color='#022b42'
              style={styles.Input}
              value={ConfirmarSenha}
              autoCapitalize='none'
              selectionColor='#022b42'
              onChangeText={(text) => setConfirmarSenha(text)}
            />
            <TouchableOpacity
              style={styles.ShowPassword}
              onPress={() => setVerSenha([VerSenha[0], !VerSenha[1]])}
            >
              <Ionicons name={VerSenha[1] === true ? 'eye' : 'eye-off'} color='#022b42' size={30} />
            </TouchableOpacity>
          </View>


          <TouchableOpacity
            style={[styles.btn, { backgroundColor: ColorBtn }]}
            onPress={() => fazerCadastro()}
          >
            <Text style={{ color: '#fff' }}>Fazer cadastro</Text>
          </TouchableOpacity>

        </Animated.View>
      </Animated.View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#11114e',
  },
  logo: {
    position: 'absolute',
    top: 80,
    width: 200,
    height: 200,
    marginLeft: 5
  },
  Input: {
    width: 280,
    height: 50,
    paddingTop: 26,
    paddingLeft: 40,
    paddingRight: 42,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#11114e',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,

  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
    height: 45,
    marginTop: 4,
    marginBottom: 50,
    borderWidth: 0.9,
    borderColor: '#b6b9b4',
    borderRadius: 10,

  },
  ShowPassword: {
    top: 18,
    marginLeft: -34,
  },
  TextCadastrar: {
    position: 'absolute',
    textAlign: 'center',
    top: 50,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#022b42'
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
  },
  SairCadastro: {
    position: 'absolute',
    top: 20,
    left: 10,
  }

});