import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import { Entypo } from 'react-native-vector-icons'
import firebase from '../firebase';
export default function Tasks( {data} ) {
    const user = firebase.auth().currentUser.email
    const uid =firebase.auth().currentUser.uid
    const [color, setColor] = useState('#080740')
    const [concluido, setConcluido] = useState(false)

    function mudarCor(){
        setColor('#1aba2f')
        setConcluido(true)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.tarefas, {backgroundColor: concluido===true?'#1aba2f':'#080740'}]}>
                <TouchableOpacity

                >
                    <Entypo name='trash' size={25} color='#afafc4'/>
                </TouchableOpacity>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.textTask}>{data.nome}</Text>
                </ScrollView>
                
                <TouchableOpacity
                    onPress={() => mudarCor()}
                >
                    <Entypo name='check' size={25} color='#afafc4' />
                </TouchableOpacity>
            </View>
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
        marginBottom: 20,
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