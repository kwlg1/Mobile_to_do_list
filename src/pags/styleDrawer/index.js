import React, {  useState } from 'react';
import { StyleSheet, View,Text, TouchableOpacity, Alert, ScrollView} from 'react-native';
import { EvilIcons, Ionicons } from 'react-native-vector-icons';
import firebase from '../firebase'
import { DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

export default function StyleDrawer(){
    const user = firebase.auth().currentUser
    const [opcao, setOpcao] = useState(false)

    if(opcao === true){
        firebase.auth().signOut(user.email)
    }

    function LogOut(){    
        Alert.alert('Sign Out', 'Você deseja mesmo fazer sair da sua conta?', [
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

    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <View style={styles.User}>
                <EvilIcons name="user" color="#d4d4d4" size={80} style={{height:69}} />
                <ScrollView>
                    <Text style={styles.TextUser}>{user.email}</Text> 
                </ScrollView>
            </View>
            <View style={styles.line}></View>
            <DrawerItem
                label={() => <Text style={styles.textHome}>Home</Text>}
                style= {styles.Home}
                icon={() => <Ionicons name="home" color="#d4d4d4" size={20} />}
                pressColor='#d4d4d4'
                onPress={() => navigation.navigate('Home')}
            />
            <TouchableOpacity style={styles.logOut} onPress={() => LogOut()}>
                <Text style={styles.textLogOut}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11114e',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  User: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#839deb',
    borderTopLeftRadius: 10,
    borderTopRightRadius:10,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    paddingBottom: 6,
    marginBottom: 10,
    width: 270,
    height: 120,
},
TextUser: {
    color: '#d4d4d4',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    paddingLeft: 6,
},
logOut: {
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#839deb',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 270,
    borderRadius: 5,
},
textLogOut: {
    color: '#d4d4d4',
    fontSize: 16,
    fontWeight: 'bold',
},
Home: {
    color: '#d4d4d4',
    backgroundColor: '#839deb',
    justifyContent: 'center',
    width: 270,
    height: 40,
    borderRadius: 5,
    marginTop: 10,
},
textHome: {
    color: '#d4d4d4',
    height: 20,
    fontSize: 16,
    fontWeight: 'bold',
    
},
line: {
    height: 0.5,
    width: 270,
    backgroundColor: '#839deb',
    marginTop: 0,
}
});
