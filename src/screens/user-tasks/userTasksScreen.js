import { Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Button } from 'react-native';
import { generalStyles } from '../../styles/general-styles.js';
import { styles } from './style.js';
import { useState, useEffect } from 'react';
import { deleteUserTasks } from '../../services/userTasksServices.js';
import { getUserTask } from '../../services/userTasksServices.js';

export function UserTaskScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [usersTasks, setUsersTasks] = useState([]);
  const [filteredUsersTasks, setFilteredUsersTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedUser, setExpandedUser] = useState(null);


  //Função para buscar todos os usuários com as tarefas
  const axiosUserTask = async () => {
    setLoading(true);

    try {
      const data = await getUserTask();

      setUsersTasks(data);
      setFilteredUsersTasks(data);

    } catch (error) {
      console.error('Erro ao buscar os usuários e suas tarefas', error);

    } finally {
      setLoading(false);
    }
  };

  //Função para pesquisar os usuários
  const searchUsers = (text) => {
    setSearchTerm(text);

    if (text.trim() === '') {
      setFilteredUsersTasks(users);
    } else {
      const filtered = usersTasks.filter(user => {
        //Pesquisa por nome do usuário
        const nameUser = user.nome?.toLowerCase().includes(text.toLowerCase());

        //Pesquisa pelo id
        const idUser = user.id_users?.toString().includes(text);

        //Pesquisa pela tarefa
        const tasks = user.tasks?.some(task =>
          task.nomeTasks?.toLowerCase().includes(text.toLowerCase())
        );

        return nameUser || idUser || tasks;
      });

      setFilteredUsersTasks(filtered);
    }
  };

  //Carregar os usuários quando abrir a tela
  useEffect(() => {
    axiosUserTask();
  }, []);

  //Renderizar cada tarefa
  const toggleExpand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  //Define a cor do status
  const getStatusColor = (status) => {

    switch (status) {
      case 'em progresso': return '#90c0f8';
      case 'finalizada': return '#4caf50';
      case 'atrasada': return '#f44336';
      default: return '#999';
    }
  };

  //Define a cor da relevância
  const getRelevanciaColor = (relevancia) => {

    switch (relevancia) {
      case 'muito importante': return '#f44336';
      case 'importante': return '#ff9800';
      case 'pouco importante': return '#2196f3';
      default: return '#999';
    }
  };

  // Renderizar cada tarefa
  const renderTask = (task) => (
    <View key={task.id_tasks} style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskName}>📋 {task.nomeTasks}</Text>
        <Text style={[styles.taskStatus, { backgroundColor: getStatusColor(task.status) }]}>
          {task.status}
        </Text>
      </View>

      <Text style={styles.taskDetail}>⏱️ Tempo: {task.tempo}</Text>
      <Text style={[styles.taskDetail, { color: getRelevanciaColor(task.relevancia) }]}>
        ⭐ Relevância: {task.relevancia}
      </Text>
      <Text style={styles.taskDetail}>🕒 Horário: {task.horario}</Text>
      <Text style={styles.taskDetail}>🔖 ID da Tarefa: {task.id_tasks}</Text>
      <TouchableOpacity style={generalStyles.button} onPress={() => deleteUserTasks(task.id_usersTasks)}>
          <Text style={generalStyles.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  // Renderizar cada usuário
  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <TouchableOpacity onPress={() => toggleExpand(item.id_users)} activeOpacity={0.7}>
        <View style={styles.userHeader}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.nome}</Text>
            <Text style={styles.userId}>ID: {item.id_users}</Text>
            <Text style={styles.userLogin}>👤 Usuário: {item.usuario}</Text>
          </View>
          <Text style={styles.expandIcon}>
            {expandedUser === item.id_users ? '▲' : '▼'}
          </Text>
        </View>

        <View style={styles.taskSummary}>
          <Text style={styles.taskCount}>
            📌 Total de tarefas: {item.tasks?.length || 0}
          </Text>
          {item.tasks?.length > 0 && (
            <Text style={styles.expandHint}>
              {expandedUser === item.id_users ? 'Clique para fechar' : 'Clique para ver tarefas'}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {expandedUser === item.id_users && (
        <View style={styles.tasksContainer}>
          <Text style={styles.tasksTitle}>📝 Lista de Tarefas:</Text>
          {item.tasks?.length > 0 ? (
            item.tasks.map(task => renderTask(task))
          ) : (
            <Text style={styles.noTasks}>✨ Nenhuma tarefa atribuída</Text>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={generalStyles.container}>
      <Text style={styles.title}>Usuários e Tarefas</Text>

      {/* botao novo para levar para a register screen */}

      <TouchableOpacity style={generalStyles.button} onPress={() => navigation.navigate("InserirScreen")}>
          <Text style={generalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Barra de pesquisa */}
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar por nome, ID ou tarefa..."
        placeholderTextColor="#999"
        value={searchTerm}
        onChangeText={searchUsers}
      />

      {/* Lista de usuários */}
      {loading ? (
        <ActivityIndicator size="large" color="#f5b8f1" />
      ) : (
        <FlatList
          data={filteredUsersTasks}
          renderItem={renderUser}
          keyExtractor={(item) => item.id_users.toString()}
          style={styles.userList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum usuário encontrado</Text>
          }
        />
      )}

      <TouchableOpacity
        style={generalStyles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={generalStyles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
