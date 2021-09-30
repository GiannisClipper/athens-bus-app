import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as style from '../_commons/style/nav';
import LineGroups from '../lines/LineGroups';
import RouteNav from '../routes/RouteNav';
import StopNav from '../stops/StopNav';

const Stack = createNativeStackNavigator();

const LinesNav = props => {

    return (
        <Stack.Navigator 
            initialRouteName='LineGroups' 

            screenOptions={ { 
                headerShown: false,
                ...style.stack,
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
                options={ { headerShown: true } }
            />

        </Stack.Navigator>
    );
}

export default LinesNav;