import React, { useState } from 'react'; 
import { 
    View,
    StyleSheet, 
    Text, 
} from 'react-native'; 

import { getStatusBarHeight } from 'react-native-iphone-x-helper'; 
import { getData } from '../auth/storage';



export const Header = () => {
 
    const [ name, setName ] = useState<string | null>(null); 

    getData('user')
    .then(name => {
        setName(name)
    })

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting} >Sua lista de Receitas:</Text>
            </View>

        </View>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent:'flex-start', 
        paddingVertical: 20, 
        marginTop: getStatusBarHeight(),
    }, 
    image: {
        width: 70, 
        height: 70, 
        borderRadius: 40
    },
    greeting: {
        fontSize: 22, 
        fontWeight:'bold',
        color: '#3D7199',  
    }, 
    userName: {
        fontSize: 32, 
        color: '#3D7199', 
        lineHeight: 40
    }, 

}); 