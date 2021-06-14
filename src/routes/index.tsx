import React, { useEffect, useState } from 'react'; 
import { NavigationContainer, useNavigation } from '@react-navigation/native'; 

import InStack from './in.stack.routes'; 
import OutStack from './out.stack.routes'; 

import { createStackNavigator } from '@react-navigation/stack';
import { isSigned } from '../auth/storage';
import { Login } from '../pages/Login';
import { Splash } from '../pages/Splash';


 
const Routes = () => {


    const [ signed, setSigned ] = useState<Boolean>(false); 

    useEffect(() => {
        
            isSigned()
            .then(res => {

                if(res){
                    console.log(res)
                    setSigned(res)
                    // navigation.reset({
                    //     index: 0, 
                    //     routes: [{name: 'SignedOut'}]
                    // })
                }
    
            })
            .catch(error => { console.error(error)})

    }, [])

    const Stack = createStackNavigator(); 

    //    console.log(signed)
    
    return(
        <NavigationContainer>
            
            <Stack.Navigator>

                <Stack.Screen
                    name='Splash'
                    component={Splash}
                    options={{
                        headerShown:false
                    }}
                />

                <Stack.Screen name="SignedOut" options={{
                    headerShown:false
                }}>
                    {props => <OutStack/>}
                </Stack.Screen>
            
                <Stack.Screen name="SignedIn" options={{
                    headerShown:false
                }}>
                    {props => <InStack/>}
                </Stack.Screen>
                
            </Stack.Navigator>

        </NavigationContainer>   
    )

} 
export default Routes; 
