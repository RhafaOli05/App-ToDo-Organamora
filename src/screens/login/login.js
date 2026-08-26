import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { styles } from './styles.js';
import { generalStyles } from '../../styles/general-styles.js'; 

export function LoginScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      navigation.replace('Home');
    } else {
      Alert.alert('Erro', 'Usuário ou senha inválidos!');
    }
  };

  return (
    <View style={generalStyles.container}> 
    <Image source={require('../../../assets/Organamora.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
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
    </View>
  );
}
