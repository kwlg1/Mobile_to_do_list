import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, Alert, FlatList, Modal} from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import firebase from '../firebase'
import Tasks from './task'
import AdcionarTask from './adcionarTask'
import { useNavigation } from '@react-navigation/native';

export default function Tela() {
    const [viewModal, setViewModal] =  useState(false)
    const [tarefas, setTarefas] = useState()
    const user = firebase.auth().currentUser
    const navigation = useNavigation()
    
    useEffect(() => {
      async function Pegardados(){
        await firebase.database().ref(`User/${user.uid}`).on('value', (snapshot) => {
          const dados = JSON.parse(snapshot.val())
          setTarefas(dados)
        })
      }
      Pegardados()

    }, [])

    function fechar(){
      setViewModal(false)
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#11114e" />
        <TouchableOpacity 
          style={styles.IconDrawer}
          onPress={() => navigation.openDrawer()}
        >
          <MaterialIcons name="menu" color="#839deb" size={30} />
        </TouchableOpacity>
        <Text style={styles.Text}>Bem vindo</Text>
        <View style={styles.viewTask}>
          <TouchableOpacity
            style={styles.AdcionarTask}
            onPress={() => setViewModal(true)}
          >
            <MaterialIcons name="add-box" color="#080740" size={100} />
          </TouchableOpacity>

          <Modal
            animationType='slide'
            transparent={true}
            visible={viewModal}
          >
            <AdcionarTask fechar={() => fechar()} />
          </Modal>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={tarefas}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Tasks data={item} />}
          />
          
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: '#11114e',
    },
    Text: {
      color: '#fff',
      fontSize: 35,
      fontWeight: 'bold',
      left: 20,
      bottom: 60,
      width: 280,
      height: 90,
   
    },
    viewTask: {
      backgroundColor: '#839deb',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: 500,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    AdcionarTask: {
      marginTop: 100,
    },
    tarefas: {
      height: 400,
      padding: 10,        
    },
    IconDrawer: {
      position: 'absolute',
      top: 15,
      left: 10,
    }

});