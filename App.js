import react, { useEffect,useState } from 'react';
import firebase from './src/pags/firebase';

import Home from './src/pags/Tasks/Home'
import Login from './src/pags/Login';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/pags/routes/stack';
import RoutesDrawer from './src/pags/routes/Drawer';

export default function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    })
  }, []);

  if(user){
    return <RoutesDrawer></RoutesDrawer>
  }
  
  return (
      <NavigationContainer>
        <Routes></Routes>
      </NavigationContainer>
  )
}