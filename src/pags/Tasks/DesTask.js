import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { Entypo, MaterialIcons} from 'react-native-vector-icons'

import firebase from '../firebase'

export default function DescTask({ data, fechar }){
    const [tarefas, setTarefas] = useState()
    const user = firebase.auth().currentUser

    useEffect(() => {
        async function Pegardados(){
          await firebase.database().ref(`User/${user.uid}`).on('value', (snapshot) => {
            const dados = JSON.parse(snapshot.val())
            setTarefas(dados)
          })
        }
        Pegardados()
      }, [])

    function apagarDados(){
        const index = tarefas.indexOf(data.nome)
        alert(index)
    }

    function mudarCor(){

    }

    return(
        <View style={styles.container}>

            <View style={[styles.tarefas, { backgroundColor: data.concluido === true ? '#1aba2f' : '#080740' }]}>
                <TouchableOpacity
                    onPress={() => apagarDados()}
                >
                    <Entypo name='trash' size={25} color='#afafc4' />
                </TouchableOpacity>

                <View style={styles.ViewFechar}>
                <TouchableOpacity
                    onPress={fechar}
                >
                    <MaterialIcons name='fullscreen-exit' size={20} color='#afafc4'/>
                </TouchableOpacity>
                <ScrollView 
                    style={styles.TextDesc}
                    showsVerticalScrollIndicator={false}
                    >
                    <Text style={styles.textTask}>{data.desc}</Text>
                </ScrollView>
                </View>

                <TouchableOpacity
                    onPress={() => mudarCor()}
                >
                    <Entypo name='check' size={25} color='#afafc4' />
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    tarefas: {
        width: "100%",
        height: 400,
        flexDirection: 'row',
        paddingTop: 30,
        padding: 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,

    },
    textTask : {
        fontSize: 16,
        color: "#afafc4",
        textAlign: 'justify',
        
    },
    TextDesc: {
        marginTop: 20,
        marginBottom: 20,
        margin: 10,

    },
    ViewFechar: {
        alignItems: 'center',
        width: 300,
    }
})