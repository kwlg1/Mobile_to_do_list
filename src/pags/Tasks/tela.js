import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, Alert, FlatList, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons, MaterialIcons } from 'react-native-vector-icons';

import firebase from '../firebase'
import Tasks from './task'
import AdcionarTask from './adcionarTask'

export default function Tela() {
    const [opcao, setOpcao] = useState(false)
    const navigation = useNavigation()
    const [viewModal, setViewModal] =  useState(false)
    const [tarefas, setTarefas] = useState()
    const user = firebase.auth().currentUser

    function fechar(){
      setViewModal(false)
    }

    useEffect(() => {
      async function Pegardados(){
        await firebase.database().ref(`User/${user.uid}`).on('value', (snapshot) => {
          const dados = JSON.parse(snapshot.val())
          setTarefas(dados)
        })
      }
      Pegardados()
    }, [])

    if(opcao === true){
        firebase.auth().signOut(user.email)
        .then((value) => {
            navigation.navigate('Login')
        })
        .catch((error) => {
            console.error('Deu erro')
        })
    }

    function LogOut(){    
        Alert.alert('Sign Out', 'Você deseja mesmo fazer sign Out', [
            {
                text: 'Cancelar',
                onPress: () => setOpcao(false)
            },
            {
                text: 'Confirmar',
                onPress: () => setOpcao(true)
            }
        ])

    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#344f7c" />
        <View style={styles.User}>
          <Feather name="user" color="#fff" size={60} />
          <Text style={styles.TextUser}>{user.email}</Text>
          <TouchableOpacity style={styles.logOut} onPress={() => LogOut()}>
            <Ionicons name="log-out-outline" color="#fff" size={40} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.AdcionarTask}
          onPress={() => setViewModal(true)}
        >
          <MaterialIcons name="add-box" color="#080740" size={100} />
        </TouchableOpacity>

        <Modal
          animationType='slide'
          transparent={true}
          visible={viewModal}
        >
          <AdcionarTask fechar={() => fechar()} />
        </Modal>
        <View style={styles.tarefas}>

        <FlatList
            showsVerticalScrollIndicator={false}
            data={tarefas}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Tasks data={item} />}
        />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#839deb',
      alignItems: 'center',
      justifyContent: 'center',
    },
    User: {
        position: 'absolute',
        left: 0,
        top: 1,
        height: 110,
        width: 400,
        backgroundColor: '#344f7c',
        paddingLeft: 5,
        paddingTop: 10
    },
    TextUser: {
        color: '#fff',
        margin: 5,
        marginLeft: 5, 
        fontSize: 16,
    },
    logOut: {
        position: 'absolute',
        top: 8,
        right: 25,

    },
    AdcionarTask: {
      position: 'absolute',
      alignItems: 'center',
      flexDirection: 'row',
      top: 200
    },
    tarefas: {
      height: 400,
      marginTop: 360,
      padding: 10,
      marginBottom: 100
    }

});