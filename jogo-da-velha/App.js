import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, RefreshControl, ScrollView, Modal, TouchableOpacity } from 'react-native';
import Figura from './components/figura';
import { useState } from 'react';

let array = new Array(9).fill(0);

export default function App() {
  const [values, setValues] = useState({
    isCross: true,
    winMessage: "",
    modalVisible: false
  });

  const [refresh, setRefresh] = useState(false);

  const refreshGame = () => {
    setRefresh(true);
    array.fill(0);
    setValues({ isCross: true, winMessage: "" });
    setRefresh(false);
  };

  const changeMove = (number) => {
    if (array[number] === 0 && !values.winMessage) {
      array[number] = values.isCross ? 1 : -1;
      setValues(prev => ({ ...prev, isCross: !prev.isCross }));
      winGame(number);
    }
  };

  const winGame = (number) => {
    if (
      // Linhas
      (array[0] === array[number] && array[1] === array[number] && array[2] === array[number]) ||
      (array[3] === array[number] && array[4] === array[number] && array[5] === array[number]) ||
      (array[6] === array[number] && array[7] === array[number] && array[8] === array[number]) ||

      // Colunas
      (array[0] === array[number] && array[3] === array[number] && array[6] === array[number]) ||
      (array[1] === array[number] && array[4] === array[number] && array[7] === array[number]) ||
      (array[2] === array[number] && array[5] === array[number] && array[8] === array[number]) ||

      // Diagonais
      (array[0] === array[number] && array[4] === array[number] && array[8] === array[number]) ||
      (array[2] === array[number] && array[4] === array[number] && array[6] === array[number])
    ) {
      const winner = array[number] === 1 ? "X" : "O";
      setValues({
        ...values,
        winMessage: `**${winner} Venceu**`,
        modalVisible: true
      });
    } else if (array.every((element) => element !== 0)) {
      setValues({
        ...values,
        winMessage: "**Empate**",
        modalVisible: true
      });
    }
  };

  const resetGame = () => {
    array = new Array(9).fill(0);
    setValues({
      isCross: true,
      winMessage: "",
      modalVisible: false
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => refreshGame()} />
      }
    >
      <View style={styles.title}>
        <Text style={styles.text}>Jogo da </Text>
        <Text style={styles.boldText}>Velha</Text>
      </View>
      <View style={styles.row}>
        {array.map((_, index) => (
          <View key={index} style={styles.box}>
            <Figura vetor={array} posicao={index} clicado={() => changeMove(index)} />
          </View>
        ))}
      </View>
      <Modal
        visible={values.modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setValues(prev => ({ ...prev, modalVisible: false }))}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {values.winMessage.split('**').map((part, index) => 
                index % 2 === 1 
                  ? <Text key={index} style={styles.boldText}>{part}</Text> 
                  : part
              )}
            </Text>
            <TouchableOpacity onPress={resetGame} style={styles.button}>
              <Text style={styles.buttonText}>Jogar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    border: 0,
    height: 'auto'
  },  
  text: {
    fontSize: 40,
    color: '#000'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 100
  },
  box: {
    borderWidth: 2,
    borderColor: '#000',
    padding: 10
  },
  winMessage: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: 300
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});