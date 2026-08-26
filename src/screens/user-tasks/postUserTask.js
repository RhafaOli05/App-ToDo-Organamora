import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { generalStyles } from '../../styles/general-styles.js';
import { styles } from './style.js';
import { useState } from 'react';
import { postUserTask } from '../../services/userTasksServices.js';

export function InserirScreen({ navigation }) {

  const [id_tasks, setTaskUser] = useState("");
  const [id_users, setUserTask] = useState("");
  const [horario, setHorario] = useState("");
  
  const cadastrarUserTask = async () => {
    try {
      const response = await postUserTask({ id_tasks, id_users, horario });
      alert(response.data.mensagem);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={generalStyles.container}>
      <Text style={styles.title}>Cadastrar Tarefas</Text>

      <TextInput style={styles.searchBar} placeholder='Id Tarefa' value={id_tasks} onChangeText={setTaskUser} />
      <TextInput style={styles.searchBar} placeholder='Id Usuário' value={id_users} onChangeText={setUserTask} />
      <TextInput style={styles.searchBar} placeholder='Horário' value={horario} onChangeText={setHorario} />

      <TouchableOpacity style={generalStyles.button} onPress={cadastrarUserTask}>
        <Text style={generalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={generalStyles.button} onPress={() => navigation.goBack()}>
        <Text style={generalStyles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}