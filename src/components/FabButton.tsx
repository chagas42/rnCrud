import React , { Component } from 'react'; 
import { 
    Text,
    View, 
    StyleSheet, 
    TouchableWithoutFeedback,
    Animated
} from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ButtonProps { 
    onPress: () => void; 
}

export const FabButton = ({onPress}:ButtonProps) => {




        return(
           
            <View
                style={[styles.container, {bottom:20, right:50}]}
            >
                <TouchableOpacity onPress={onPress}>
                    <Animated.View style={[styles.button, styles.menu]}>
                        <AntDesign
                            name='plus'
                            size={24}
                            color="#fff"
                        />
                    </Animated.View>
                </TouchableOpacity>

            </View>
        )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center', 
        position: 'absolute',  
    }, 
    button: {
        padding: 20,
        borderRadius: 60, 
        justifyContent: 'center', 
        alignContent: 'center',
        shadowRadius: 25, 
        shadowColor: '#00213b', 
        shadowOpacity: 0.5, 
        shadowOffset: {
            height: 9,
            width: 0
        }
    }, 
    menu : {
        backgroundColor: '#3D7199', 
    }
})