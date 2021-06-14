import React from 'react'; 
import { createStackNavigator } from '@react-navigation/stack'; 

import { Login } from '../pages/Login';

const Stack = createStackNavigator(); 

const inStack = () => {

    return(
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="Login"
                component={Login}
            />
        </Stack.Navigator>
    ); 
}; 

export default inStack; 