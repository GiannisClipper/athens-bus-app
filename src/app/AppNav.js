import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { 
    createDrawerNavigator, 
    DrawerContentScrollView, 
    DrawerItemList, 
    DrawerItem
} from '@react-navigation/drawer';

import { navigationRef } from '../_commons/logic/rootNavigation';
import { resetNavigation } from '../_commons/logic/branchNavigation';

import { AppContext } from './AppContext';
import * as style from '../_commons/style/nav';
import { MenuIcon, HomeIcon, LineIcon, MySelectedIcon, SettingsIcon } from '../_commons/Icons';

import Home from '../home/Home';
import LinesNav from '../lines/LinesNav';
import MyNav from '../my/MyNav';
import Settings from '../settings/Settings';

const Drawer = createDrawerNavigator();

const DrawerHeaderIcon = ( { navigation } ) => (
    <View style={ style.drawer.header.icon } >
        <MenuIcon
            { ...style.drawer.header.icon }
            onPress={ () => navigation.toggleDrawer() }
        />
    </View>
);

const CustomDrawerContent = props => {

    const { navigation } = props;

    const appContext = useContext( AppContext );

    appContext.appNavigation = navigation;

    return (
        <DrawerContentScrollView { ...props }>

            {/* <DrawerItemList { ...props } /> */}

            <DrawerItem
                style={ style.drawer.item.view }
                labelStyle={ style.drawer.item.text }
                icon={ () => <HomeIcon { ...style.drawer.item.icon } /> }
                label="Home"
                onPress={ () => {
                    appContext.appNavigation = navigation;
                    navigation.navigate( 'Home' ); 
                } }
            />

            <DrawerItem
                style={ style.drawer.item.view }
                labelStyle={ style.drawer.item.text }
                label="Lines"
                icon={ () => <LineIcon { ...style.drawer.item.icon } /> }
                onPress={ () => { 
                    resetNavigation( navigation );
                    appContext.appNavigation = navigation;
                    navigation.navigate( 'Lines' );
                } }
            />

            <DrawerItem
                style={ style.drawer.item.view }
                labelStyle={ style.drawer.item.text }
                label="Favourites"
                icon={ () => <MySelectedIcon { ...style.drawer.item.icon } /> }
                onPress={ () => {
                    resetNavigation( navigation );
                    appContext.appNavigation = navigation;
                    navigation.navigate( 'Favourites' );
                } }
            />

            <DrawerItem
                style={ style.drawer.item.view }
                labelStyle={ style.drawer.item.text }
                icon={ () => <SettingsIcon { ...style.drawer.item.icon } /> }
                label="Settings"
                onPress={ () => {
                    appContext.appNavigation = navigation;
                    navigation.navigate( 'Settings' ) 
                } }
    />

        </DrawerContentScrollView>
    );
}

const AppNav = props => {

    const appContext = useContext( AppContext );

    const headerLeft = () => <DrawerHeaderIcon navigation={ appContext.appNavigation } />;

    useEffect( () => appContext.setLoadStatus( { isLoaded: true } ), [] );

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
                    options={ { headerLeft } }
                />

                <Drawer.Screen 
                    name='Lines' 
                    component={ LinesNav }
                    options={ { headerLeft } }
                />

                <Drawer.Screen 
                    name='Favourites' 
                    component={ MyNav } 
                    options={ { headerLeft } }
                />

                <Drawer.Screen 
                    name='Settings' 
                    component={ Settings } 
                    options={ { headerLeft } }
                />

            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AppNav;