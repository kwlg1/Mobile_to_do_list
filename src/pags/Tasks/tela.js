import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, Alert, FlatList, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons, MaterialIcons } from 'react-native-vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import firebase from '../firebase';
import Tasks from './task';
import AdcionarTask from './adcionarTask'

export default function Tela() {
    const [opcao, setOpcao] = useState(false);
    const [Task, setTask] = useState([])
    const [input, setInput] = useState('')
    const navigation = useNavigation();
    const [viewModal, setViewModal] =  useState(false)

    const user = firebase.auth().currentUser.email
    const tarefas = []
    useEffect(() => {
      async function pegarDados(){
        await AsyncStorage.getItem("@tarefas").then((value) => {
          tarefas.push(JSON.parse(value))
        })
      }
      pegarDados();
    },[])

    if(opcao === true){
        firebase.auth().signOut(user)
        .then(() => {
            navigation.navigate('Login')
        })
        .catch((error) => {
            console.log("Error signing out", error);
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
          <Text style={styles.TextUser}>{user}</Text>
          <TouchableOpacity style={styles.logOut} onPress={() => LogOut()}>
            <Ionicons name="log-out-outline" color="#fff" size={40} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setViewModal(true)}
        >
          <MaterialIcons name="add-box" color="#1d44b8" size={70} />
        </TouchableOpacity>

        <Modal
          animationType='slide'
          transparent={true}
          visible={viewModal}
        >
          <AdcionarTask fechar={() => setViewModal(false)} />
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
      alignItems: 'center',
      flexDirection: 'row',
      top: 200
    },
    tarefas: {
      height: 400,
      marginTop: 220,
      padding: 10,
      marginBottom: 100
    }

});