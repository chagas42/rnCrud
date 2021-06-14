    import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

interface TokenProps {
    token : string;
    userName: string; 
}

export async function saveData(data:TokenProps): Promise<void> {
    
   await AsyncStorage.multiSet([
        [ '@pro_franchising:token', data.token ], 
        [ '@pro_franchising:user', data.userName ]
    ])

}; 

export async function getData( nameData:string ){

    const data = await AsyncStorage.getItem(`@pro_franchising:${nameData}`);

    return data; 

}; 

export async function isSigned(){
    
    const token = await getData('token'); 

    const signed = (token !== null); 

    return signed; 

}; 

export async function isLogOut(){
    
    AsyncStorage.multiRemove([
        '@pro_franchising:token', 
        '@pro_franchising:user'
    ])
    console.log('removido');
}; 

