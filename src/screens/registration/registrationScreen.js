import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import { styles } from './style.js';
import { generalStyles } from '../../styles/general-styles.js';

export function RegistrationScreen({ navigation }) {

    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    const handleCadastro = async () => {

        if (!nome || !email || !senha) {
            Alert.alert('Atenção', 'Preencha todos os campos!');
            return;
        }

        try {

            const response = await axios.post(
                'http://localhost:3000/login/registration',
                {
                    nome,
                    email,
                    senha
                }
            );

            Alert.alert(
                'Sucesso',
                response.data.mensagem,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack()
                    }
                ]
            );

        } catch (error) {

            console.log(error);

            Alert.alert(
                'Erro',
                'Não foi possível realizar o cadastro.'
            );
        }
    };

    return (
        <View style={generalStyles.container}>

            <Image
                source={require('../../../assets/Organamora.png')}
                style={styles.logo}
            />

            <Text style={styles.title}>Criar conta</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <TouchableOpacity
                style={generalStyles.button}
                onPress={handleCadastro}
            >
                <Text style={generalStyles.buttonText}>
                    Cadastrar
                </Text>
            </TouchableOpacity>

        </View>
    );
}