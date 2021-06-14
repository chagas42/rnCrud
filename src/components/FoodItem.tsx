import React from 'react'; 
import {
    StyleSheet, 
    Text,  
    View, 
    Animated,
    Image, 
    TouchableOpacityProps, 
    TouchableOpacity
} from 'react-native'; 

import Swipeable from 'react-native-gesture-handler/Swipeable'; 
import { Feather } from '@expo/vector-icons';


import food from '../assets/breakfast.png'


interface FoodProps extends TouchableOpacityProps {
    data: {
        name: string;
        id:number; 
        price: number; 
        
    }; 
    handleRemove: () => void; 
}

export const FoodItem = ({ data, handleRemove, ...rest }: FoodProps) => {
    return(
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <TouchableOpacity
                            style={styles.buttonRemove}
                            onPress={handleRemove}
                        >
                            <Feather 
                                name="trash-2"
                                size={32} 
                                color={'#fff'}
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        >
            <TouchableOpacity
                style={styles.container}
                {...rest}
            >
                <Image
                    source={food}
                    style={styles.food}
                />
                <Text style={styles.title}>
                    {data.name}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.priceLabel}>
                        Preço:
                    </Text>
                    <Text style={styles.price}>
                        R${data.price}
                    </Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}; 

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        paddingHorizontal: 20,
        paddingVertical: 25, 
        borderRadius: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#eeee', 
        marginVertical: 5, 
    },
    title: {
        flex: 1, 
        marginLeft: 10, 
        fontSize: 17,
        color: '#3D7199',
    }, 
    details: {
        alignItems: 'flex-end',
        flexDirection:'row'
    }, 
    priceLabel: {
        fontSize: 16, 
        color: '#AAB2AD',
        marginRight:5
    }, 
    price: { 
        marginTop: 5, 
        fontSize: 16, 
        color: '#738078'
    }, 
    buttonRemove: {
        width: 100, 
        height: 85, 
        backgroundColor: '#E83F5B', 
        marginTop: 15, 
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'relative',
        right: 5, 
        paddingLeft: 15, 
    }, 
    food: {
        height: 60, 
        width: 60
    }
}); 