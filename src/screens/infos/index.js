import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles.js';
import { generalStyles } from '../../styles/general-styles.js';

export function SobreScreen({ navigation }) {
  return (
    <View style={generalStyles.container}>
      <Text style={styles.title}>Sobre</Text>

      <View style={styles.card}>
        <Text style={styles.subtitle}>
          O Organamora, desenvolvido pela empresa Amoras Cibernéticas, é uma Aplicação Web de tarefas criada para transformar a organização do dia a dia em algo simples, prático e até divertido. A plataforma permite que os usuários gerenciem suas atividades, definam metas e acompanhem seu progresso de forma intuitiva, ajudando tanto no uso pessoal quanto em equipe.

          {"\n\n"}

          Inspirado em soluções modernas de produtividade, o Organamora centraliza tudo em um só lugar: tarefas, lembretes e planejamento, facilitando a rotina e evitando aquela clássica bagunça mental de “tinha que fazer isso e esqueci”. Além disso, a proposta da Amoras é trazer uma experiência leve e eficiente, mostrando que produtividade não precisa ser complicada — pode acontecer “num plim”.
        </Text>
      </View>

      <TouchableOpacity style={generalStyles.button} onPress={() => navigation.goBack()}>
        <Text style={generalStyles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

