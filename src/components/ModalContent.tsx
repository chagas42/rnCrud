import React, { useState } from 'react'; 
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet, 
    Text, 
    TextInput, 
    View, 
    TouchableOpacity,
    Alert
} from 'react-native'; 

import { TextInputMask } from 'react-native-masked-text'; 
import { newItem } from '../services/api';

interface ModalProps {
    onPress: () => void; 
}

export const ModalContent = ({onPress}:ModalProps) => {

    const [ nameTextField, setNameTextField ] = useState<string>(''); 
    const [ priceTextField, setPriceTextField ] = useState<string>(''); 

    function handleAction(){
        const price = Number(priceTextField?.replace(',', '.').slice(2))
        if(nameTextField.length < 3){
            return Alert.alert('Nome de receita inválido tente novamente 🥲');
        }
        if(price < 1){
            return Alert.alert('Insira um valor para sua receita 🥲'); 
        }
        if(priceTextField?.length < 3)
            return Alert.alert('Insira um valor para sua receita 🥲'); 

        newItem(nameTextField, price)
        .then(() => {
            onPress();
        })


    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
        >
            <View style={styles.container}>
                
                <TextInput
                    placeholder="Nome da receita"
                    style={styles.nameInput}
                    value={nameTextField}
                    onChangeText={(t) => setNameTextField(t)}
                />

                <TextInputMask
                    type={'money'}
                    placeholder="Preço"
                    style={styles.nameInput}
                    keyboardType="numeric"
                    value={priceTextField}
                    onChangeText={(t) => setPriceTextField(t)}
                />

                <TouchableOpacity 
                    onPress={handleAction}
                    style={styles.button}
                >   
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingVertical:20, 
        paddingHorizontal:30,
        width: '100%', 
        // backgroundColor:'red' 
    }, 
    nameInput: {
        fontSize: 16,
        borderRadius: 15, 
        borderColor: '#bbb', 
        borderStyle: 'solid',
        borderWidth: 2,  
        height: 50, 
        width: '100%', 
        padding: 15, 
        marginBottom: 25
    },
    button: {
        backgroundColor: '#3D7199', 
        height: 46, 
        borderRadius: 15, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff', 
        fontSize: 18, 
        fontWeight: 'bold'
    }
}); 