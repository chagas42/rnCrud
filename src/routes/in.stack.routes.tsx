import React from 'react'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import AuthRoutes from './tab.routes';
import { Add } from '../pages/Add';

const Stack = createStackNavigator(); 

const inStack = () => {

    return(
        <Stack.Navigator 
            initialRouteName='Home'
            headerMode="none"
        >
            <Stack.Screen
                name="Home"
                component={AuthRoutes}
            />
            <Stack.Screen
                name="Add"
                component={Add}
            />

        </Stack.Navigator>
    ); 
}; 

export default inStack; 