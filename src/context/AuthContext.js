import axios from "axios";
import { createContext, useState } from "react";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const register = (name, email, password) => {
        setIsLoading(true);
        axios
            .post(`${BASE_URL}/register`, {
                name,
                email,
                password,
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
                // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                // setIsLoading(false);
                console.log(userInfo);
            })
            .catch(e => {
                console.log(`register error ${e}`);
                // setIsLoading(false);
            });
    };

    const login = (email, password) => {
        setIsLoading(true);

        axios
            .post(`${BASE_URL}/login`, {
                email,
                password,
            })
            .then(res => {
                let userInfo = res.data;
                console.log(userInfo);
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`login error ${e}`);
                setIsLoading(false);
            });
    };

    const logout = () => {
        setIsLoading(true);

        axios
            .get(
                `${BASE_URL}/logout`,
                {},
                
            )
            .then(res => {
                console.log(res.data);
                AsyncStorage.removeItem('userInfo');
                setUserInfo({});
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`logout error ${e}`);
                setIsLoading(false);
            });
    };
    



    return (
        <AuthContext.Provider value={{
            isLoading,
            userInfo,
            register,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}