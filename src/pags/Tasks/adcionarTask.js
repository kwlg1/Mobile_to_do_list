import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdcionarTask( {fechar} ) {


    async function adcionarTarefa(){
        
        await AsyncStorage.setItem("@tarefas", )
    }
 return (
     <View style={styles.container}>
         <View style={styles.Form}>
            <TouchableOpacity
                style={styles.sair}
                onPress={fechar}
            >
                <MaterialIcons name="fullscreen-exit" size={25} color="#afafc4" />
            </TouchableOpacity>

            <Text style={[styles.text, {marginTop: 40}]}>Nome</Text>
             <TextInput
                 style={styles.input}
                 placeholder="Ex. Caminhar"
                 placeholderTextColor="#afafc4"
             />
            <Text style={styles.text}>Descrição</Text>
             <TextInput
                 style={styles.input}
                 placeholder="Ex. fui caminhar as 5h da manhã"
                 placeholderTextColor="#afafc4"
             />
            <TouchableOpacity
                style={styles.Add}
                onPress={() => adcionarTarefa()}
            >
                <MaterialIcons name='post-add' size={55} color='#afafc4' />
            </TouchableOpacity>
         </View>
     </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    Form: {
        width: "100%",
        height: 400,
        backgroundColor: '#080740',
        paddingTop: 30,
        padding: 30,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    input: {
        height: 53,
        width: 260,
        borderWidth: 2,
        backgroundColor: '#696969',
        borderColor: '#080740',
        borderRadius: 8,
        padding: 15
    },
    text: {
        fontSize: 18,
        color: "#afafc4",
        marginTop: 20,
        marginLeft: 12
    },
    Add: {
        alignItems: 'center',
        marginTop: 40
    },
    sair: {
        alignItems: 'center'
    }
})