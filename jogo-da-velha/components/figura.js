import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

export default function Figura({ vetor, posicao, clicado }) {
  // Função para definir o ícone baseado no valor no vetor
  const getIcon = () => {
    if (vetor[posicao] === 1) {
      return "cross"; // Entypo para "X"
    } else if (vetor[posicao] === -1) {
      return "circle"; // Entypo para "O"
    }
    return "pencil"; // Ícone para uma célula vazia
  };

  // Função para definir a cor com base no valor do vetor
  const getColor = () => {
    if (vetor[posicao] === 1) {
      return "red"; // Cor para "X"
    } else if (vetor[posicao] === -1) {
      return "green"; // Cor para "O"
    }
    return "#000"; // Cor padrão para células vazias
  };

  return (
    <TouchableOpacity onPress={clicado}>
      <Entypo name={getIcon()} size={100} color={getColor()} />
    </TouchableOpacity>
  );
}