import { Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Image } from 'react-native';
import { generalStyles } from '../../styles/general-styles.js';
import { taskStyles } from './styles.js';
import { useState } from 'react';
import { postTask } from '../../services/tasksServices.js';

export function DadosTask({ navigation }) {

  const [nome, setNome] = useState("");
  const [tempo, setTempo] = useState("");
  const [relevancia, setRelevancia] = useState("");
  const [status, setStatus] = useState("");

  const cadastrarTask = async () => {

    try {
      const response = await postTask({ nome, tempo, relevancia, status });
      alert(response.data.mensagem);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={generalStyles.container}>
      <Text style={taskStyles.title}>Cadastrar Tarefas</Text>

      <TextInput style={taskStyles.searchBar} placeholder='Nome' value={nome} onChangeText={setNome} />
      <TextInput style={taskStyles.searchBar} placeholder='Tempo' value={tempo} onChangeText={setTempo} />
      <TextInput style={taskStyles.searchBar} placeholder='Relevância' value={relevancia} onChangeText={setRelevancia} />
      <TextInput style={taskStyles.searchBar} placeholder='Status' value={status} onChangeText={setStatus} />
      <TouchableOpacity style={generalStyles.button} onPress={cadastrarTask}>
        <Text style={generalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>



      <TouchableOpacity style={generalStyles.button} onPress={() => navigation.goBack()}>
        <Text style={generalStyles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}