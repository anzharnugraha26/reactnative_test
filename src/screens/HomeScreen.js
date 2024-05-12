import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const { userInfo, isLoading, logout, } = useContext(AuthContext);


    const [todo, setTodo] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            // Panggil endpoint setiap kali fokus masuk ke layar ini (HomeScreen)
            fetchData();
        }, [])
    );

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getdata/${userInfo.user.id}`);
            setTodo(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Gagal mengambil data:', error);
        }
    };

    useEffect(() => {
        // Cleanup function untuk membersihkan state jika komponen unmount
        return () => {
            setTodo(null);
        };
    }, []);

    const onDeleteClick = async (todo) => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete this user?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        await axios.get(`${BASE_URL}/destroy/${todo}`)
                            .then(() => {
                                fetchData();
                            })
                            .catch(error => {
                                console.error('Error deleting user:', error);
                            });
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container1}>
                    <Spinner visible={isLoading} />
                    <Text style={styles.welcome}>Welcome {userInfo.user.name}</Text>
                    <Button title="Tambah Data" style={styles.marginTop} color="blue" onPress={() => navigation.navigate('Tambah')} />
                    <Button title="Logout" style={styles.marginTop} color="red" onPress={logout} />
                </View>
                {todo ?


                    <View style={styles.container}>
                        {todo.map((data) => (
                            <View style={styles.card} key={data.id}>
                                <Text>{data.title}</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => navigation.navigate('Edit', { id: data.id })}
                                    >
                                        <Text>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => { onDeleteClick(data.id) }}
                                    >
                                        <Text>Hapus</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                    :
                    <Text>Tidak ada data</Text>
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    container1: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 18,
        marginBottom: 8,
    },
    marginTop: {
        marginTop: 20
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        width: '80%',
        elevation: 3,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
    },

});

export default HomeScreen