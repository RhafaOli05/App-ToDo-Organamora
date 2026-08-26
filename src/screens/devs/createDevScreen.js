import { Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Image } from 'react-native';
import { generalStyles } from '../../styles/general-styles.js';
import { devStyles } from './styles.js';
import { useState } from 'react';
import { postDev } from '../../services/devServices.js'

export function RegisterScreen({ navigation }) {
  const [funcao, setFuncao] = useState("");
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState("");
  const [frase, setFrase] = useState("");

  const cadastrarDev = async () => {
    try {
      const response = await postDev({ funcao, nome, foto, frase });
      alert(response.data.mensagem);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={generalStyles.container}>
      <Text style={devStyles.title}>Cadastrar Desenvolvedores</Text>

      <TextInput style={devStyles.searchBar} placeholder='Função' value={funcao} onChangeText={setFuncao} />
      <TextInput style={devStyles.searchBar} placeholder='Nome' value={nome} onChangeText={setNome} />
      <TextInput style={devStyles.searchBar} placeholder='Foto' value={foto} onChangeText={setFoto} />
      <TextInput style={devStyles.searchBar} placeholder='Frase' value={frase} onChangeText={setFrase} />
      <TouchableOpacity style={generalStyles.button} onPress={cadastrarDev}>
        <Text style={generalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>



      <TouchableOpacity style={generalStyles.button} onPress={() => navigation.goBack()}>
        <Text style={generalStyles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}