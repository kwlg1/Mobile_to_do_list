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
        Alert.alert('Sign Out', 'Você deseja mesmo fazer sign Out?', [
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
                <EvilIcons name="user" color="#363636" size={80} style={{height:66}} />
                <ScrollView>
                    <Text style={styles.TextUser}>{user.email}</Text> 
                </ScrollView>
            </View>
            <View style={styles.line}></View>
            <DrawerItem
                label={() => <Text style={styles.textHome}>Home</Text>}
                style= {styles.Home}
                icon={() => <Ionicons name="home" color="#11114e" size={20} />}
                pressColor='#11114e'
                onPress={() => navigation.navigate('Home')}
            />
            <TouchableOpacity style={styles.logOut} onPress={() => LogOut()}>
                <Text style={styles.textLogOut}>Log Out</Text>
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
    backgroundColor: '#e2e5e8',
    borderTopLeftRadius: 10,
    borderTopRightRadius:10,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    paddingBottom: 6,
    marginBottom: 10,
    width: 270,
    height: 110,
},
TextUser: {
    color: '#363636',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    paddingLeft: 6,
},
logOut: {
    position: 'absolute',
    bottom: 5,
    backgroundColor: '#e2e5e8',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 270,
    borderRadius: 5,
},
textLogOut: {
    color: '#11114e',
    fontSize: 16,
    fontWeight: 'bold',
},
Home: {
    color: '#11114e',
    backgroundColor: '#e2e5e8',
    justifyContent: 'center',
    width: 270,
    height: 40,
    borderRadius: 5,
    marginTop: 10,
},
textHome: {
    color: '#11114e',
    height: 20,
    fontSize: 16,
    fontWeight: 'bold',
    
},
line: {
    height: 0.5,
    width: 270,
    backgroundColor: '#e2e5e8',
    marginTop: 10,
}
});
