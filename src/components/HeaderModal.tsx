import React from 'react'; 
import { 
    View, 
    StyleSheet, 
    Text
 } from 'react-native'; 

 export const HeaderModal = () => {

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Nova Receita</Text>
        </View>
    ); 
 }; 

 const styles = StyleSheet.create({
     container: {
        paddingVertical:30, 
        paddingHorizontal: 20, 
        alignItems: 'center', 
        justifyContent: 'center'
     }, 
     title: {
        fontSize: 27, 
        color:'#3D7199',
        fontWeight: 'bold'
     }
 }); 