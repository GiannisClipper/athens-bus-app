import React, { useContext, useEffect } from 'react';
import { CacheContext } from '../_commons/CacheContext';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../home/Home';
import LinesNav from '../lines/LinesNav';
import MyNav from '../my/MyNav';

const Drawer = createDrawerNavigator();

const AppNav = () => {

    const { cache } = useContext( CacheContext );
    const { lines } = cache;

    if ( lines.error ) { 
        Object.keys( lines ).forEach( key => delete lines[ key ] ); // clear cache in case of error to request again
    }

    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName='Home'

                screenOptions={ { 
                    drawerStyle: {
                        backgroundColor: 'skyblue',
                        width: '44%',
                    },

                    drawerLabelStyle: {
                        color: 'steelblue',
                        fontWeight: '600'
                    },

                    headerStyle: {
                        backgroundColor: 'steelblue',
                    },

                    headerTintColor: 'skyblue',

                    headerTitleStyle: {
                        color: 'skyblue',
                    },

                } }
            >
                <Drawer.Screen 
                    name='Home' 
                    component={ Home } 
                />

                <Drawer.Screen 
                    name='Lines' 
                   component={ LinesNav } 
                />

                <Drawer.Screen 
                    name='Favourites' 
                    component={ MyNav } 
                />

            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AppNav;