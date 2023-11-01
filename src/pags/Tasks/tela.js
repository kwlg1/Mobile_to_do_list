import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, Alert, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons, MaterialIcons } from 'react-native-vector-icons';
import firebase from '../firebase';
import Tasks from './task';
import { TextInput } from 'react-native-gesture-handler';

export default function Tela() {
    const [opcao, setOpcao] = useState(false);
    const [Task, setTask] = useState([])
    const [input, setInput] = useState('')
    const navigation = useNavigation();
    const user = firebase.auth().currentUser.email
    const teste = [
        { id: 1, nome: 'Alysson fksgbjkdbgskdbfskfbskjsbdkvsbkskgbskbgkbsgkskgbksgbkbgksbgksgkbskgbksgbskbgksbgkbskb'},
        { id: 2, nome: 'DoRegoAraujo'},
        { id: 3, nome: 'Klêvson'}
    ]

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

    useEffect(() => {
    },[])

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
        <View style={{flexDirection: 'row '}}>
          <TextInput
            style={styles.input}
            placeholder="Ex. Caminhar"
            placeholderTextColor="#afafc4"
            value={input}
            onChangeText={(text) => setInput(text)}
          />
          <TouchableOpacity>
            <MaterialIcons name="add-box" color="#1d44b8" size={50} />
          </TouchableOpacity>
        </View>
        <FlatList
            style={{ marginTop: 200 }}
            data={teste}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Tasks data={item} />}
        />
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
    input: {
        top: 200,
        height: 50,
        width: 260,
        borderWidth: 1,
        backgroundColor: '#696969',
        borderColor: '#1d44b8',
        borderRadius: 8,
        marginBottom: 50,
    }

});