import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Modal} from 'react-native';
import { Entypo } from 'react-native-vector-icons'
import firebase from '../firebase';
import DescTask from './DesTask';
export default function Tasks( {data} ) {
    const user = firebase.auth().currentUser.email
    const uid =firebase.auth().currentUser.uid
    const [color, setColor] = useState('#080740')
    const [concluido, setConcluido] = useState(false)
    const [vizualizar, setVizualizar] = useState(false)

    function mudarCor(){
        setColor('#1aba2f')
        setConcluido(true)
    }

    return (
        <View style={[styles.container, {opacity: vizualizar===true? 0.5: 20}]}>
            <TouchableOpacity
                onPress={() => setVizualizar(true)}
            >
                <View style={[styles.tarefas, { backgroundColor: concluido === true ? '#1aba2f' : '#080740' }]}>
                        <Text style={styles.textTask}>{data.nome}</Text>
                </View>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={vizualizar}
                >
                    <DescTask data={data} fechar={() => setVizualizar(false)}/>
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