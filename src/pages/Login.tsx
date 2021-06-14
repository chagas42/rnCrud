import React, { useState } from 'react'; 
import { 
    StyleSheet, 
    SafeAreaView, 
    Text, 
    TextInput, 
    View, 
    KeyboardAvoidingView,
    Platform, 
    TouchableWithoutFeedback,
    Keyboard, 
    Image,
    Alert
} from 'react-native'; 

import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api';
import { saveData } from '../auth/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({...props}) => {
    
    const navigation = useNavigation(); 

    const [ nameTextField, setNameTextField ] = useState<string>('')
    const [ passwordTextField, setPasswordTextField ] = useState<string>(''); 
    const [ isFocusedName, setIsFocusedName ] = useState<boolean>(false);
    const [ isFocusedPass, setIsFocusedPass ] = useState<boolean>(false);

    const handleAction = async () => {
        try {
            
            if(nameTextField?.length < 3 )
                return Alert.alert('Preencha novamente o campo, este nome é inválido 🥲'); 
            
            if(passwordTextField === '')
               return Alert.alert('Prencha o campo de senha 😄'); 
            
             
            const credentials = {
                "password": passwordTextField,
                "username": nameTextField
            }

            const response = await api.post('auth/login', credentials);
            
            if(response.status === 200){  
                
                 saveData({ 
                    token: response.headers.authorization, 
                    userName: response.data.name
                  });

                navigation.reset({
                    index: 0, 
                    routes: [{ name: 'SignedIn' }]
                })
            }

        } catch (error) {
            return Alert.alert("Nome ou senha inválidos \n Tente novamente!")
        }

    }; 


    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
            >
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                    <View style={styles.content}>

                        <Image
                            source={require('../assets/restaurant.png')}
                            style={styles.image}
                        />

                        <View style={(isFocusedName || isFocusedPass) ? styles.inputAreaFocused : styles.inputArea}>
                            <TextInput
                                style={!isFocusedName ? styles.input : styles.inputFocus}
                                placeholder="name"
                                value={nameTextField}
                                onChangeText={txt => setNameTextField(txt)}
                                onFocus={() => setIsFocusedName(true)}
                                onBlur={() => setIsFocusedName(false)}
                                keyboardType="default"
                                autoCapitalize="none"
                            />

                            <TextInput
                                style={!isFocusedPass ? styles.input : styles.inputFocus}
                                placeholder="password"
                                value={passwordTextField}
                                onChangeText={txt => setPasswordTextField(txt)}
                                secureTextEntry={true}
                                onFocus={() => setIsFocusedPass(true)}
                                onBlur={() => setIsFocusedPass(false)}
                                keyboardType="numeric"
                            />
                            <View style={styles.buttonArea}>
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={handleAction}
                                >
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        flex:1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '100%'
    },
    content:{
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        width: '100%', 
        paddingTop: 100, 
        paddingBottom: 200
    }, 
    input: {
        fontSize: 16,
        borderRadius: 5, 
        borderColor: '#bbb', 
        borderStyle: 'solid',
        borderWidth: 1,  
        height: 50, 
        width: '80%', 
        padding: 15, 
        marginBottom: 25
    },
    inputFocus: {
        fontSize: 16,
        borderRadius: 15, 
        borderColor: '#3D7199', 
        borderStyle: 'solid',
        borderWidth: 1.5,  
        height: 50, 
        width: '80%', 
        padding: 15, 
        marginBottom: 25
    }, 
    inputArea: { 
        // backgroundColor: 'red', 
        width: '100%', 
        // flex:1,
        alignItems: 'center',
        marginTop: 50,
    },
    inputAreaFocused: {
        // backgroundColor: 'red', 
        width: '100%', 
        // flex:1,
        alignItems: 'center',
        marginTop: 150
    }, 
    buttonArea: {
        width: '80%', 
        marginTop: 40
    },
    button: {
        backgroundColor: '#3D7199', 
        height: 56, 
        borderRadius: 6, 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    buttonText: {
        fontSize: 16, 
        color: 'white', 
        fontWeight: 'bold'
    }, 
    image: {
        height: 100,
        width: 100,
        marginTop:70, 
    }
}); 