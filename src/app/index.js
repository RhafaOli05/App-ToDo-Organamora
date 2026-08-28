import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TarefasScreen } from '../screens/tasks/taskScreen.js'
import { UsersScreen } from '../screens/users/userScreen.js';
import { UserTaskScreen } from '../screens/user-tasks/userTasksScreen.js'
import { LoginScreen } from '../screens/login/login.js'
import { HomeScreen } from '../screens/home/home.js'
import { DevsScreen } from '../screens/devs/devScreen.js';
import { SobreScreen } from '../screens/infos/index.js'
import { ProgramadorasScreen } from '../screens/programadoras/amorasCiberneticas.js'
import { RegisterScreen } from '../screens/devs/createDevScreen.js';
import { InsertUser } from '../screens/users/createUserScreen.js';
import { DadosTask } from '../screens/tasks/createTaskScreen.js';
import { InserirScreen } from '../screens/user-tasks/postUserTask.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerStyle: {
          backgroundColor: '#8b3dff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Tarefy' }} />
        <Stack.Screen name="Desenvolvedores" component={DevsScreen} options={{ title: 'Desenvolvedores' }} />
        <Stack.Screen name="Usuarios" component={UsersScreen} options={{ title: 'Usuários' }} />
        <Stack.Screen name="Tarefas" component={TarefasScreen} options={{ title: 'Tarefas' }} />
        <Stack.Screen name="Usuario-tarefas" component={UserTaskScreen} options={{ title: 'Usuários e Tarefas' }} />
        <Stack.Screen name="Programadoras" component={ProgramadorasScreen} options={{ title: 'Progamadoras' }} />
        <Stack.Screen name="Sobre" component={SobreScreen} options={{ title: 'Sobre Nós' }} />
        {/* aqui é a rota pra poder levar pra RegisterScreen */}
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="InsertScreen" component={InsertUser} />
        <Stack.Screen name="DadosTask" component={DadosTask} />
        <Stack.Screen name="InserirScreen" component={InserirScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

