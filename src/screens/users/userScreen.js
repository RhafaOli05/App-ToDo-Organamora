import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { generalStyles } from '../../styles/general-styles.js';
import { userStyles } from './style.js';
import { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native-web';
import { getUsers } from '../../services/userServices.js';
import { deleteUser } from '../../services/userServices.js';
import { Button } from 'react-native-web';

export function UsersScreen({ navigation }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    
    //Função para buscar todos os usuários
    const loadUSers = async () => {
      setLoading(true);

      try {
        const data = await getUsers();

        setUsers(data);
        setFilteredUsers(data);

      } catch (error) {
        console.error('Erro ao buscar os usuários', error);

      } finally {
        setLoading(false);
      }
    };

    //Função para pesquisar os usuários
    const searchUsers = (text) => {
      setSearchTerm(text);

      if (text.trim() === '') {
        setFilteredUsers(users);
      } else {
        const filtered = users.filter(user => {

          //Pesquisa por nome do usuário
          const nameUser = user.nome?.toLowerCase().includes(text.toLowerCase());

          //Pesquisa pelo id
          const idUser = user.id_users?.toString().includes(text);

          return nameUser || idUser;
        });
        setFilteredUsers(filtered);
      }
    };

    //Carregar os usuários quando abrir a tela
    useEffect (() => {
      loadUSers();
    }, []);

    //Renderizar cada usuário na tela
    const renderUser = ({ item }) => (
      <View style={userStyles.userCard}>
        <Text style={userStyles.userName}>{item.nome}</Text>
        <Text style={userStyles.userId}> ID: {item.id_users}</Text>
        <TouchableOpacity style={generalStyles.button} onPress={() => deleteUser(item.id_users)}>
          <Text style={generalStyles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <View style={generalStyles.container}>
      <Text style={userStyles.title}>Usuários</Text>

      {/* Barra de pesquisa */}
      <TextInput
        style={userStyles.searchBar}
        placeholder="Pesquisar usuários..."
        placeholderTextColor="#999"
        value={searchTerm}
        onChangeText={searchUsers}
      />

      {/* botao novo para levar para a register screen */}

      <TouchableOpacity style={generalStyles.button} onPress={() => navigation.navigate("InsertScreen")}>
        <Text style={generalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Lista de usuários */}
      {loading ? (
        <ActivityIndicator size="large" color="#f5b8f1" />
      ) : (
        <FlatList 
          data={filteredUsers}
          renderItem={renderUser}
          keyExtractor={(item) => item.id_users.toString()}
          style={userStyles.userList}
          ListEmptyComponent={
            <Text style={userStyles.emptyText}>Nenhum usuário encontrado</Text>
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
