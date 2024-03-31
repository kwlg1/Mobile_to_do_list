import { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, FlatList, Modal, Animated } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import firebase from '../firebase'
import Tasks from './task'
import AdcionarTask from './adcionarTask'
import { useNavigation } from '@react-navigation/native';

export default function Tela() {
  const [viewModal, setViewModal] = useState(false)
  const [tarefas, setTarefas] = useState()
  const user = firebase.auth().currentUser
  const navigation = useNavigation()
  const ComponentAnimated = useRef(new Animated.Value(0)).current
  const containerAnimated = useRef(new Animated.Value(0)).current
  const TextAnimated = useRef(new Animated.Value(0)).current

  useEffect(() => {
    async function Pegardados() {
      await firebase.database().ref(`User/${user.uid}`).on('value', (snapshot) => {
        const dados = JSON.parse(snapshot.val())
        setTarefas(dados)
      })
    }
    Pegardados()

    Animated.timing(containerAnimated, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false
    }).start()
  
    Animated.timing(ComponentAnimated, {
      toValue: 1,
      duration: 2000,
      delay: 2500,
      useNativeDriver: false
    }).start()
  
    Animated.timing(TextAnimated, {
      toValue: 1,
      duration: 2000,
      delay: 1000,
      useNativeDriver: false
    }).start()

  }, [])

  function fechar() {
    setViewModal(false)
  }

  return (
    <Animated.View style={[styles.container, { opacity: containerAnimated }]}>
      <StatusBar backgroundColor="#11114e" />
      <TouchableOpacity
        style={styles.IconDrawer}
        onPress={() => navigation.openDrawer()}
      >
        <MaterialIcons name="menu" color="#839deb" size={30} />
      </TouchableOpacity>
      <Animated.Text style={[styles.Text, { opacity: TextAnimated }]}>Bem vindo</Animated.Text>
      
      <Animated.View style={[styles.viewTask, { opacity: ComponentAnimated }]}>

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
        </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#11114e',
  },
  Text: {
    color: '#d4d4d4',
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