import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { generalStyles } from '../../styles/general-styles.js';
import { userStyles } from './style.js';
import { useState } from 'react';
import { postUser } from '../../services/userServices.js'

export function InsertUser({ navigation }) {

  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrarUser = async () => {
    try {
      const response = await postUser({ nome, usuario, senha });
      alert(response.data.mensagem);
    } catch (error) {
      console.error('Erro ao cadastrar usuário', error);
    }
  };

  return (
    <View style={generalStyles.container}>
      <Text style={userStyles.title}>Cadastrar Usuários</Text>

      <TextInput style={userStyles.searchBar} placeholder='Nome' value={nome} onChangeText={setNome} />
      <TextInput style={userStyles.searchBar} placeholder='Usuario' value={usuario} onChangeText={setUsuario} />
      <TextInput style={userStyles.searchBar} placeholder='Senha' value={senha} onChangeText={setSenha} />
      <TouchableOpacity style={generalStyles.button} onPress={cadastrarUser}>
        <Text style={generalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={generalStyles.button} onPress={() => navigation.goBack()}>
        <Text style={generalStyles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  )
};
