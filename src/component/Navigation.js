import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from '../context/AuthContext';
import TambahData from '../screens/TambahData';
import EditScreen from '../screens/EditScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { userInfo } = useContext(AuthContext);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {userInfo.token ? (
                    <>
                        <Stack.Screen name='Home' component={HomeScreen} />
                        <Stack.Screen name='Tambah' component={TambahData} />
                        <Stack.Screen name='Edit' component={EditScreen} />

                    </>
                )
                    :
                    <>
                        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
                    </>
                }


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation