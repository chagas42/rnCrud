import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'; 
import { 
    StyleSheet, 
    SafeAreaView, 
    Text
 } from 'react-native'; 
import { isSigned } from '../auth/storage';
import { Load } from '../components/Load';


export const Splash = ({...props}) => {
    
    const navigation = useNavigation(); 

    useEffect(() => {

        async function verifyRoutes(){
            const sign = await isSigned(); 
            if(sign){
                navigation.reset({
                    index:0, 
                    routes: [{name:'SignedIn'}]
                })
            } else { 
                navigation.reset({
                    index:0, 
                    routes: [{name:'SignedOut'}]
                })
            }
        }

        verifyRoutes();

    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <Load/>
        </SafeAreaView>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        flex:1, 
        width: '100%',
        alignItems: 'center', 
        justifyContent: 'center', 
    }
}); 