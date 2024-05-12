import { useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";

const EditScreen = ({ navigation }) => {
    const [title, setTitle] = useState();
    const { userInfo } = useContext(AuthContext);
    const route = useRoute();
    const { id } = route.params;
    const [todo, setTodo] = useState();
    useEffect(() => {

        axios.get(`${BASE_URL}/getdataDetail/${id}`)
            .then(({ data }) => {

                setTodo(data)
                console.log(data)
            })
            .catch(() => {
                console.log("error");
            })
    }, [])
    const onSubmit = () => {
        const payload = {
            title: title,
            userid: userInfo.user.id
        }
        axios.post(`${BASE_URL}/update/${id}`, payload)
            .then(() => {
                console.log("Done");
                navigation.navigate('Home')
            })
            .catch(err => {
                console.log(err);
            })
    }
    // console.log(id);
    return (
        <View style={styles.container}>

            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    value={title}
                    placeholder="Enter Title"
                    onChangeText={text => setTitle(text)}
                />

                <Button
                    title="Update"
                    onPress={onSubmit}
                />

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '80%',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    link: {
        color: 'blue',
    },
});

export default EditScreen