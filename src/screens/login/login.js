import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { styles } from './styles.js';
import { generalStyles } from '../../styles/general-styles.js';
import axios from 'axios';

export function LoginScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {

    console.log('BOTÃO DE LOGIN CLICADO');
    console.log('Email:', username);
    console.log('Senha:', password);

    try {
      const response = await axios.post(
        'http://localhost:3000/login',

        {
          email: username,
          senha: password
        }
      );

      if (response.data.sucesso) {
        navigation.replace('Home')
      }

    } catch (error) {
      Alert.alert('Erro', 'Email ou senha inválidos')
    }
  };

  return (
    <View style={generalStyles.container}> 
    <Image source={require('../../../assets/Organamora.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={generalStyles.button} onPress={handleLogin}>
        <Text style={generalStyles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text> Criar uma conta </Text>
      </TouchableOpacity>
    </View>
  );
}
