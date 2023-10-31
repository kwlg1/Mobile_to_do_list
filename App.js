import { StyleSheet, View } from 'react-native';
import Routes from './src/pags/routes/index';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <View style={styles.container}>
      <Routes></Routes>
    </View>
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
