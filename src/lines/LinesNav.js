import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LineGroups from '../lines/LineGroups';
import RouteNav from '../routes/RouteNav';
import StopNav from '../stops/StopNav';

const Stack = createNativeStackNavigator();

const LinesNav = ( { navigation } ) => {

    return (
        <Stack.Navigator 
            initialRouteName='LineGroups' 
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
                name='LineGroups' 
                component={ LineGroups } 
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

export default LinesNav;