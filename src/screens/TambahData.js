import { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";


const TambahData = ({navigation}) => {
    const [title, setTitle] = useState(null);
    const { userInfo } = useContext(AuthContext);
    // console.log(userInfo.user.id);
    const onSubmit = () => {
        const payload = {
            title: title,
            userid: userInfo.user.id
        }
        axios.post(`${BASE_URL}/create`, payload)
        .then(()=> {
            console.log("Done");
            navigation.navigate('Home')
        })
        .catch(err => {
            console.log(err);
        })
    }
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
                    title="ADD"
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

export default TambahData