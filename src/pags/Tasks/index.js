import React, { useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from 'react-native-vector-icons';
import { User } from '../Login/index';
import firebase from '../firebase';
export default function Tasks() {
    const user = User;
    const navigation = useNavigation();
    const [opcao, setOpcao] = useState('')
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
        if(opcao == true){
            firebase.auth().signOut(user)
            .then(() => {
                navigation.navigate('Login')
            })
            .catch((error) => {
                console.log("Error signing out", error);
        })            
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#344f7c'/> 
            <View style={styles.User}>
                <Feather name='user' color='#fff' size={60} />
                <Text style={styles.TextUser}>{user}</Text>
                <TouchableOpacity
                    style={styles.logOut} 
                    onPress={() => LogOut()}
                >
                    <Ionicons name='log-out-outline' color='#fff' size={40} />
                </TouchableOpacity>
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

    }
});