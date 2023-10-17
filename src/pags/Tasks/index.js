import React from 'react';
import { View, StyleSheet, Text} from 'react-native';

export default function Tasks() {

    return (
        <View style={styles.container}>
            <Text>Pagina Tasks</Text>
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