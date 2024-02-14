import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Login/index';
import Cadastro from '../cadastro/index';

export default function Routes() {

    const Stack = createStackNavigator();
  
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
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
  