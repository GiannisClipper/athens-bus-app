import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { navigationRef } from '../_commons/RootNavigation';
import { resetRouteStates } from '../_commons/BranchNavigation';
import { AppContext } from './AppContext';
import * as style from '../_commons/style/nav';
import { HomeIcon, LineIcon, MySelectedIcon, SettingsIcon } from '../_commons/Icons';
import Home from '../home/Home';
import LinesNav from '../lines/LinesNav';
import MyNav from '../my/MyNav';
import Settings from '../settings/Settings';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {

    const { navigation } = props;

    return (
        <DrawerContentScrollView { ...props }>

            {/* <DrawerItemList { ...props } /> */}

            <DrawerItem
                style={ style.drawer.item.view }
                labelStyle={ style.drawer.item.text }
                icon={ () => <HomeIcon { ...style.drawer.item.icon } /> }
                label="Home"
                onPress={ () => navigation.navigate( 'Home' ) }
            />

            <DrawerItem
                style={ style.drawer.item.view }
                labelStyle={ style.drawer.item.text }
                label="Lines"
                icon={ () => <LineIcon { ...style.drawer.item.icon } /> }
                onPress={ () => { 
                    resetRouteStates( navigation );
                    navigation.navigate( 'Lines' );
                } }
            />

            <DrawerItem
                style={ style.drawer.item.view }
                labelStyle={ style.drawer.item.text }
                label="Favourites"
                icon={ () => <MySelectedIcon { ...style.drawer.item.icon } /> }
                onPress={ () => {
                    resetRouteStates( navigation );
                    navigation.navigate( 'Favourites' );
                } }
            />

            <DrawerItem
                style={ style.drawer.item.view }
                labelStyle={ style.drawer.item.text }
                icon={ () => <SettingsIcon { ...style.drawer.item.icon } /> }
                label="Settings"
                onPress={ () => navigation.navigate( 'Settings' ) }
    />

        </DrawerContentScrollView>
    );
}

const AppNav = props => {

    const { setLoadStatus } = useContext( AppContext );

    useEffect( () => setLoadStatus( { isLoaded: true } ), [] );

    return (
        <NavigationContainer ref={ navigationRef }>
            <Drawer.Navigator
    
                drawerContent={ props => <CustomDrawerContent { ...props } /> }

                initialRouteName='Home'

                screenOptions={ { 
                    drawerStyle: style.drawer.drawer,
                    headerStyle: style.drawer.header.view,
                    headerTintColor: style.drawer.header.text,
                    headerTitleStyle: style.drawer.header.text,
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

                <Drawer.Screen 
                    name='Settings' 
                    component={ Settings } 
                />

            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AppNav;