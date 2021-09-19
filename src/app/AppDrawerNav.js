import React, { useContext, useEffect } from 'react';
import { CacheContext } from '../_commons/CacheContext';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../home/Home';
import LineGroups from '../lines/LineGroups';
import MyStops from '../stops/MyStops';

const Drawer = createDrawerNavigator();

const AppDrawerNav = () => {

    const { cache } = useContext( CacheContext );
    const { lines } = cache;

    if ( lines.error ) { 
        Object.keys( lines ).forEach( key => delete lines[ key ] ); // clear cache in case of error to request again
    }

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Home'>
                <Drawer.Screen name='Home' component={ Home } />
                <Drawer.Screen name='Lines' component={ LineGroups } />
                <Drawer.Screen 
                    name='MyStops' 
                    component={ MyStops }
                / >
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AppDrawerNav;