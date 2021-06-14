import React from 'react'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { View, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


import { Home } from '../pages/Home';
import { isLogOut } from '../auth/storage';
import { useNavigation } from '@react-navigation/core';

const AddModal = () => (
    <View/>
)

const AppTab = createBottomTabNavigator(); 

const AuthRoutes = () => {

    const navigation = useNavigation(); 

    const handleLogout = () => {
        Alert.alert("Sair", `deseja mesmo sair?`, [
            {
                text: 'Não', 
                style: 'cancel'
            }, 
            {
                text: 'Sim', 
                onPress: () => {
                    try {
                        isLogOut()
                        .then(response => {
                            navigation.reset({
                                index:0, 
                                routes:[{name: 'SignedOut'}]
                            })
                        })
                        .catch(error => console.error(error))
                        
    
                        
    
                    } catch (error) {
                        Alert.alert('Não foi possível remover! 🥲');
                        console.log(error)
                    }
                }
            }
        ])
    }

    return(
        <AppTab.Navigator
            tabBarOptions={{
                activeTintColor: '#3D7199', 
                inactiveTintColor: '#52665A',
                labelPosition: 'beside-icon', 
                style: {
                    paddingVertical: 20, 
                    height: 88
                },
            }}>
                <AppTab.Screen
                    name="Minhas Receitas"
                    component={Home}
                    options={{
                        tabBarIcon: (({ size, color }) => (
                            <MaterialIcons
                                name="format-list-bulleted"
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                />
                <AppTab.Screen
                    name="Sair"
                    component={AddModal}
                    options={{
                        tabBarIcon: (({ size, color }) => (
                            <MaterialIcons
                                name='logout'
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                    listeners={() => ({
                        tabPress: (e) => {
                            e.preventDefault();
                            handleLogout(); 
                        }, 
                    })}
                />
        </AppTab.Navigator>
    )
}

export default AuthRoutes; 