import React, {useState} from 'react';
import { Ionicons} from 'react-native-vector-icons'
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity } from 'react-native';

export default function Cadastro() {

    const logo = require('../../../assets/logo.png')
    const [VerSenha, setVerSenha] = useState(false)
    const [ColorBtn, setColorBtn] = useState("#334f7c")
    return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#839deb" />
          <View>
            <Image style={styles.logo} source={logo}></Image>
            <Text style={[styles.Text, {fontSize: 20, textAlign: 'center', marginBottom: 45}]}>{`Insira seu email e senha \npara realizar seu cadastro`}</Text>
            <Text style={styles.Text}>Email</Text>
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

            <Text style={styles.Text}>Confirmar senha</Text>
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
      width: 120,
      height: 45,
      marginLeft: 90,
      borderRadius: 14,
    },
    Icon: {
      marginTop: 4,
      marginLeft: -34,
    }
  });