import React from 'react'; 
import { StyleSheet, View } from 'react-native'; 
import  LottieView from 'lottie-react-native'; 

import loadingAnimation from '../assets/load.json'; 

export const Load = () => {
    return(
        <View style={styles.container}>
            <LottieView
                style={styles.animation}
                source={loadingAnimation}
                autoPlay
                loop
            />
        </View>
    )
}; 

const styles = StyleSheet.create({
    container: {
        flex:1, 
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff'
    }, 
    animation: {
        backgroundColor: 'transparent', 
        width: 200, 
        height: 200
    }
}); 

