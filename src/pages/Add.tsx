import React, { useState } from 'react'; 
import { 
    StyleSheet, 
    SafeAreaView, 
    Text,
    TouchableOpacity, 
    View,
    Image,
    Alert
} from 'react-native'; 

import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import { TextInputMask } from 'react-native-masked-text'; 

import { ItemProps } from '../libs/Props'; 
import food from '../assets/breakfast.png'; 
import { editItem } from '../services/api';


interface Params {
    item: ItemProps; 
    action: () => void; 
}

export const Add = () => {
  
    const [ isPrice, setIsPrice ] = useState<Boolean>(true); 
    const [ priceTextField, setPriceTextField ] = useState(''); 


    const navigation = useNavigation(); 
    const routes = useRoute();
    
    const { item, action } = routes.params as Params; 

    function handleAction(){
        const price = Number(priceTextField?.replace(',', '.').slice(2))
    
        
        console.log(price)

        if(price < 1){
            return Alert.alert('Insira um novo valor para sua receita 😀'); 
        }
        if(priceTextField?.length < 3)
            return Alert.alert('Insira um novo valor para sua receita 😄'); 
        if(price === item.price)
            return Alert.alert('Insira um valor diferente do existente')
        if(isNaN(price))
            return Alert.alert('Insira um valor entre \n R$1 - R$1000')

        editItem(price, item.id, item.name)
        .then(response => {
            item.price = price
            navigation.reset({
                index:0, 
                routes: [{name: 'Home'}]
            })
            
        })
        .catch(error => console.log(error))
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.imageArea}>
                <Image
                    source={food}
                    style={styles.image}
                />
                <View style={styles.TitleArea}>
                    <Text style={styles.title}>{item.name}</Text>
                </View>
            </View>
            <View style={styles.infoArea}>
                <View style={styles.ingredientsArea}>
                    <View style={styles.priceArea}>
                        {isPrice ?
                        
                            <View style={styles.priceLabel}>
                                <Text style={styles.price}>
                                    Preço: {item.price}
                                </Text>
                            </View>
                            :
                            <TextInputMask
                                type='money'
                                style={styles.inputPrice}
                                placeholder={String(item.price)}
                                value={priceTextField}
                                keyboardType={'number-pad'}
                                onChangeText={(t) => setPriceTextField(t)}
                            />
                        }
                        <TouchableOpacity
                            onPress={() => setIsPrice(false)}
                            disabled={Boolean(!isPrice)}
                        >
                            <Feather
                                name="edit"
                                size={22}
                                color={isPrice == true?"#3D7199" : "#cccc"}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonArea}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={handleAction}
                        >
                            <Text style={styles.buttonText} >Alterar Preço</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        width: '100%',
        // backgroundColor:'red', 
        justifyContent: 'center', 
        alignItems:'center',
        paddingHorizontal: 5, 
        paddingTop: 50, 
    }, 
    imageArea: {
        width: '100%', 
        alignItems:'center', 
        justifyContent: 'space-between', 
        paddingTop: 20, 
        // paddingVertical: 40
    }, 
    infoArea: {
        flex:1, 
        width: '100%'
    }, 
    image: {
        height: 170, 
        width: 170
    }, 
    TitleArea: {
        // alignItems: 'star', 
        marginTop: 50, 
        paddingBottom: 10
    }, 
    title: {
        fontSize: 32,

        color: '#3D7199'
    }, 
    ingredientsArea: {
        flex:1, 
        // backgroundColor:'blue', 
        paddingHorizontal: 20, 
        paddingBottom:40,
        backgroundColor: '#F8F8FF', 
        borderTopWidth:2,
        borderTopColor: '#3D7199', 
        
    }, 
    priceArea: {
        // flex:1,
        flexDirection: 'row', 
        // backgroundColor: 'red', 
        paddingVertical: 30, 
        paddingHorizontal:30,
        alignItems:'center', 
        justifyContent:'space-evenly'
    }, 
    priceLabel: {
        backgroundColor:'#eee',
        borderRadius:15, 
        padding: 10,
        flex:1,
        alignItems:'center', 
        marginRight: 40
    }, 
    price: {
        fontSize: 19, 
        color:'#3D7199',
        // backgroundColor:'red', 
    }, 
    inputPrice: {
        backgroundColor:'#eee', 
        flex:1,
        padding: 15,
        paddingHorizontal: 20, 
        borderRadius: 15, 
        marginRight: 40, 
        fontSize: 18
    }, 
    buttonArea: {
        alignItems:'center'
    },
    button: {
        width: '80%',
        marginTop:30,
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