import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Entypo, MaterialIcons, AntDesign } from 'react-native-vector-icons'

import firebase from '../firebase'
import FormTask from './FormTask'

export default function DescTask(props) {
    const [tarefas, setTarefas] = useState()
    const user = firebase.auth().currentUser
    const [viewModal, setViewModal] = useState(false)
    const [Edit, setEdit] = useState(false)
    const index = ''

    useEffect(() => {
        async function Pegardados() {
            await firebase.database().ref(`User/${user.uid}`).on('value', (snapshot) => {
                const dados = JSON.parse(snapshot.val())
                setTarefas(dados)
            })
        }
        Pegardados()

    }, [])


    async function salvarTarefas() {
        await firebase.database().ref("User/" + user.uid).set(JSON.stringify(tarefas))
    }

    function apagarDados() {
        const verificaIndex = tarefas.map((todo) => {
            const verifica = todo.id === props.data.id ? tarefas.indexOf(todo) : ''

            if (verifica !== '') {
                tarefas.splice(verifica, 1)
                salvarTarefas()
            }
        })
    }

    function concluido() {
        const dados = {
            id: props.data.id,
            nome: props.data.nome,
            desc: props.data.desc,
            data: props.data.data,
            concluido: !props.data.concluido
        }

        const verificaIndex = tarefas.map((todo) => {
            const verifica = todo.id === props.data.id ? tarefas.indexOf(todo) : ''

            if (verifica !== '') {
                tarefas.splice(verifica, 1)
                tarefas.splice(verifica, 0, dados)
                salvarTarefas()
            }
        })
    }

    function fechar() {
        setViewModal(false)
    }

    return (
        <View style={styles.container}>

            <View style={styles.tarefas}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-around', height: 80, width: 30 }}>
                    <TouchableOpacity
                        onPress={() => setViewModal(true)}
                    >
                        <AntDesign name='edit' size={25} color='#afafc4' />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => apagarDados()}
                        onPressOut={props.fechar}
                    >
                        <Entypo name='trash' size={25} color='#afafc4' />
                    </TouchableOpacity>

                </View>

                <View style={styles.ViewFechar}>
                    <TouchableOpacity
                        onPress={props.fechar}
                    >
                        <MaterialIcons name='fullscreen-exit' size={20} color='#afafc4' />
                    </TouchableOpacity>
                    <Text style={styles.data}>{`Data de Realizção\n${props.data.data}`}</Text>
                    <ScrollView
                        style={styles.TextDesc}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.textTask}>{props.data.desc}</Text>
                    </ScrollView>
                </View>

                <TouchableOpacity
                    onPress={() => concluido()}
                >
                    <Entypo name='check' size={25} color={props.data.concluido === true ? '#1e6322' : '#afafc4'} />
                </TouchableOpacity>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={viewModal}
                >
                    <FormTask fechar={() =>  fechar()} edit={true} data={props.data} />
                </Modal>

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
        backgroundColor: '#091529',
        paddingTop: 30,
        padding: 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,

    },
    textTask: {
        fontSize: 16,
        color: "#afafc4",
        textAlign: 'justify',

    },
    TextDesc: {
        width: 300,
        textAlign: 'justify',
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#afafc4',
        borderRadius: 10,
        padding: 10,

    },
    ViewFechar: {
        alignItems: 'center',
        width: 300,
    },
    data: {
        fontSize: 16,
        textAlign: 'center',
        color: '#afafc4',
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#afafc4',
        borderRadius: 10,
        padding: 10,
    }
})