import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Alert } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';
export default function AdcionarTask( {fechar} ) {
    
    const [opcao, setOpcao] = useState(false);
    const [nome, setNome] = useState('');
    const [desc,setDesc] = useState('');
    const [tarefas, setTarefas] = useState()
    const user = firebase.auth().currentUser
    const navigation = useNavigation();

    useEffect(() => {
        async function Pegardados(){
          await firebase.database().ref(`User/${user.uid}`).on('value', (snapshot) => {
            const dados = JSON.parse(snapshot.val())
            setTarefas(dados)
          })
        }
        Pegardados()
    }, [])

    async function salvarTarefas(){
        await firebase.database().ref("User/"+user.uid).set(JSON.stringify(tarefas))
    }
    async function adcionarTarefa(){
        const dados = {
            nome: nome,
            desc: desc,
            concluido: false
        }
        if(tarefas.length === 1 && tarefas[0].nome === 'Sem tarefas'){
            tarefas.pop()
            tarefas.push(dados)
            salvarTarefas()
        } else {
            tarefas.push(dados)
            salvarTarefas()
        }

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
                 value={nome}
                 onChangeText={(text) => setNome(text)}
             />
            <Text style={styles.text}>Descrição</Text>
             <TextInput
                 style={styles.input}
                 placeholder="Ex. fui caminhar as 5h da manhã"
                 placeholderTextColor="#afafc4"
                 value={desc}
                 onChangeText={(text) => setDesc(text)}
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