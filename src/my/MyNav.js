import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyListsNav from './MyListsNav';
import RouteNav from '../routes/RouteNav';
import StopNav from '../stops/StopNav';

const Stack = createNativeStackNavigator();

const MyNav = ( props ) => {

    const { navigation } = props;

    return (
        <Stack.Navigator 
            initialRouteName='MyListsNav' 

            screenOptions={ { 
                headerShown: false ,
                headerStyle: {
                    backgroundColor: 'powderblue',
                },
                headerTintColor: 'steelblue',
                headerTitleStyle: {
                    color: 'steelblue',
                    fontSize: 13,
                },
            } }
        >

            <Stack.Screen 
                name='MyListsNav' 
                component={ MyListsNav } 
                options={ { headerShown: false } } 
            />

            <Stack.Screen 
                name='RouteNav'
                component={ RouteNav }
                options={ { headerShown: true } }
            />

            <Stack.Screen 
                name='StopNav'
                component={ StopNav }
                options={ { 
                    headerShown: true,
                } }
            />

        </Stack.Navigator>
    );
}

export default MyNav;