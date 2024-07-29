import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Figura from './components/figura';
import { useState } from 'react';

let array = new Array(9).fill(0);

export default function App() {
  const [values, setValues] = useState({
    isCross: true,
    winMessage: ""
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Jogo da Velha</Text>
      <View style={styles.row}>
        <View style={styles.box}>
            <Figura />
        </View>
      </View>
      <StatusBar style="auto" />
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
  text: {
    fontSize: 40,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  box: {
    borderWidth: 2,
    borderColor: '#000',
    padding: 10
  }
});
