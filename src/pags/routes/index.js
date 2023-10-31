import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from '../Login/index';
import Tasks from '../Tasks/index';
import Cadastro from '../cadastro/index';

export default function Routes() {

    const Stack = createStackNavigator();
  
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Tasks" 
            component={Tasks}
            options={{
              headerShown: false,
            }}
           />
          <Stack.Screen
            name='Cadastro'
            component={Cadastro}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  