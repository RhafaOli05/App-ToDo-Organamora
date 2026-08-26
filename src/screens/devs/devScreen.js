import { Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Image } from 'react-native';
import { generalStyles } from '../../styles/general-styles.js';
import { devStyles } from './styles.js';
import { useState, useEffect } from 'react';
import { Button } from 'react-native-web';
import { deleteDev } from './Delete/deleteDevs.js'
import { getDevs } from '../../services/devServices.js'

export function DevsScreen({ navigation }) {

  const [searchTerm, setSearchTerm] = useState('');
  const [devs, setDevs] = useState([]);
  const [filteredDevs, setFilteredDevs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar os desenvolvedores
  const axiosDevs = async () => {
    setLoading(true);

    try {
      const data = await getDevs();

      console.log('Desenvolvedores recebidos:', data);

      setDevs(data);
      setFilteredDevs(data);

    } catch (error) {
      console.error('Erro ao buscar os desenvolvedores', error);

    } finally {
      setLoading(false);
    }
  };

  // Função para pesquisar os desenvolvedores
  const searchDevs = (text) => {
    setSearchTerm(text);

    if (text.trim() === '') {
      setFilteredDevs(devs);

    } else {
      const filtered = devs.filter(dev => {
        // Pesquisa pelo nome
        const nameDev = dev.nome?.toLowerCase().includes(text.toLowerCase());

        // Pesquisa pelo id
        const idDev = dev.id_devs?.toString().includes(text);

        // Pesquisa pela função
        const funcaoDev = dev.funcao?.toLowerCase().includes(text.toLowerCase());

        // Pesquisa pela frase
        const fraseDev = dev.frase?.toLowerCase().includes(text.toLowerCase());

        return nameDev || idDev || funcaoDev || fraseDev;
      });
      setFilteredDevs(filtered);
    }
  };

  // Carregar os desenvolvedores quando abrir a tela
  useEffect(() => {
    axiosDevs();
  }, []);

  // Renderiza cada desenvolvedor
  const renderDev = ({ item }) => (

    <View style={devStyles.devCard}>
      <View style={devStyles.devHeader}>
        {/* Imagem do desenvolvedor */}
        <Image
          source={{ uri: item.foto }}
          style={devStyles.devAvatar}
        />

        <View style={devStyles.devInfo}>
          <Text style={devStyles.devName}>{item.nome}</Text>
          <Text style={devStyles.devFuncao}>{item.funcao}</Text>

          <TouchableOpacity style={generalStyles.button} onPress={() => deleteDev(item.id_devs)}>
            <Text style={generalStyles.buttonText}>Excluir</Text>
          </TouchableOpacity>
          
        </View>
      </View>

      <Text style={devStyles.devFrase}>"{item.frase}"</Text>
    </View>
  );

  return (
    <View style={generalStyles.container}>
      <Text style={devStyles.title}>Desenvolvedores</Text>

      {/* Barra de pesquisa */}
      <TextInput
        style={devStyles.searchBar}
        placeholder="Pesquisar por nome, ID, função ou frase..."
        placeholderTextColor="#999"
        value={searchTerm}
        onChangeText={searchDevs}
      />

      {/* botao novo para levar para a register screen */}
      <Button title='Cadastrar' onPress={() => navigation.navigate("RegisterScreen")}/>

      {/* Lista de desenvolvedores */}
      {loading ? (
        <ActivityIndicator size="large" color="#f5b8f1" />
      ) : (
        <FlatList
          data={filteredDevs}
          renderItem={renderDev}
          keyExtractor={(item) => item.id_devs.toString()}
          style={devStyles.devList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={devStyles.emptyText}>Nenhum desenvolvedor encontrado</Text>
          }
        />
      )}

      <TouchableOpacity style={generalStyles.button} onPress={() => navigation.goBack()}>
        <Text style={generalStyles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}