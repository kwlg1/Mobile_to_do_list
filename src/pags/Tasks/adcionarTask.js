import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Alert } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import RNDateTimePicker, { DateTimePicker } from '@react-native-community/datetimepicker';
import firebase from '../firebase';

export default function AdcionarTask(props) {
    
    const [nome, setNome] = useState('');
    const [desc,setDesc] = useState('');
    const [data, setData] = useState(new Date());
    const [viewData, setViewData] = useState('')
    const [ShowPicker, setShowPicker] = useState(false);
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

    async function salvarTarefas(){
        await firebase.database().ref("User/"+user.uid).set(JSON.stringify(tarefas))
    }

    function fechar(){
        Alert.alert("Tarefa cadastrada", `Sua tarefa "${nome}" foi cadastrada\n\nDeseja adicionar outra tarefa?`, [
            {
                text: 'não',
                onPress: props.fechar
            },
            {
                text: 'sim',
                
            }
        ])
    }

    function openSetDate(){
        setShowPicker(true)
    }

    function dateFormat(value){
        const date = new Date(value)
        const dia = date.getDate()
        const mes = date.getMonth() + 1
        const ano = date.getFullYear()
        return `${dia<= 9 ? '0'+dia : dia} / ${mes <= 9 ? '0'+mes : mes} / ${ano}`

    }
    function selectedDate({type}, date){
        if(type === 'set'){
            setShowPicker(false)
            setData(date)
            setViewData(dateFormat(date))
        }
    }

    async function adcionarTarefa(){
        const dados = {
            id: Date.now(),
            nome: nome,
            desc: desc,
            data: viewData,
            concluido: false
        }
        if(tarefas.length === 1 && tarefas[0].nome === 'Sem tarefas'){
            tarefas.pop()
            tarefas.push(dados)
            salvarTarefas()
            fechar()
        } else {
            tarefas.push(dados)
            salvarTarefas()
            fechar()
        }

    }

 return (
     <View style={styles.container}>
         <View style={styles.Form}>
            <TouchableOpacity
                style={styles.sair}
                onPress={props.fechar}
            >
                <MaterialIcons name="fullscreen-exit" size={25} color="#afafc4" />
            </TouchableOpacity>

            <Text style={[styles.text, {marginTop: 40}]}>Nome</Text>
             <TextInput
                 style={styles.input}
                 placeholder="Ex. Caminhar"
                 placeholderTextColor="#afafc4"
                 color='#fff'
                 value={nome}
                 onChangeText={(text) => setNome(text)}
             />
            <Text style={styles.text}>Descrição</Text>
             <TextInput
                 style={styles.input}
                 placeholder="Ex. Vou caminhar as 5h da manhã"
                 placeholderTextColor="#afafc4"
                 color='#fff'
                 value={desc}
                 onChangeText={(text) => setDesc(text)}
            />

            <Text style={styles.text}>Data de Realização</Text>
            <TouchableOpacity
                onPress={() => openSetDate()}
                style={styles.input}
            >
                <Text style={{color: '#afafc4'}}>{viewData}</Text>
                {ShowPicker &&
                    <RNDateTimePicker
                        value={data}
                        dateFormat='DD/MM/YYYY'
                        mode="date"
                        display="default"   
                        onChange={selectedDate}
                    />
                }
            </TouchableOpacity>
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
        height: 480,
        backgroundColor: '#091529',
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