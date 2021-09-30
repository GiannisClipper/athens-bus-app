import React, { useEffect } from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { navigationRef } from '../_commons/RootNavigation';
import * as style from '../_commons/style/nav';
import { HomeIcon, LineIcon, MySelectedIcon } from '../_commons/Icons';
import Home from '../home/Home';
import LinesNav from '../lines/LinesNav';
import MyNav from '../my/MyNav';

const Drawer = createDrawerNavigator();

const removeNavigationState = navigation => {
    // remove navigation state to have a initial render
 
    return navigation.dispatch( state => {

        const routes = state.routes.map( route => {
            const { state, ...rest } = route;
            return { ...rest };
        } );

        return CommonActions.reset( {
            ...state,
            routes,
            index: 0,
        } );
    } );
}

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
                    removeNavigationState( navigation );
                    navigation.navigate( 'Lines' );
                } }
            />

            <DrawerItem
                style={ style.drawer.item.view }
                labelStyle={ style.drawer.item.text }
                label="Favourites"
                icon={ () => <MySelectedIcon { ...style.drawer.item.icon } /> }
                onPress={ () => {
                    removeNavigationState( navigation );
                    navigation.navigate( 'Favourites' );
                } }
            />

        </DrawerContentScrollView>
    );
}

const AppNav = () => {

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

            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default AppNav;