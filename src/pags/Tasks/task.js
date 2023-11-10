import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Modal} from 'react-native';
import firebase from '../firebase';
import DescTask from './DesTask';

export default function Tasks( {data, opcao} ) {
    const user = firebase.auth().currentUser.email
    const uid =firebase.auth().currentUser.uid
    const [color, setColor] = useState('#080740')
    const [concluido, setConcluido] = useState(false)
    const [vizualizar, setVizualizar] = useState(false)
    const tarefas = []

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setVizualizar(true)}
            >
                <View style={[styles.tarefas, { backgroundColor: data.concluido === true ? '#1e6322' : '#080740'}]}>
                    <Text style={styles.textTask}>{data.nome}</Text>
                </View>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={vizualizar}
                >
                    <DescTask  tarefas={tarefas} data={data} fechar={() => setVizualizar(false)}/>
                </Modal>
            </TouchableOpacity>
  
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    tarefas: {
        width: 340,
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        margin: 10,
        paddingLeft: 10,
        padding: 10,
        borderRadius: 6,

    },
    textTask : {
        fontSize: 16,
        color: "#afafc4",
        textAlign: 'justify',
        paddingLeft: 20,
        paddingRight: 20,
        
    },
})