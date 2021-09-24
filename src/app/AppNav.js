import React, { useContext, useRef, useEffect } from 'react';
import { CacheContext } from '../_commons/CacheContext';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { navigationRef } from '../_commons/RootNavigation';
import styles from '../_commons/stylePatterns';
import { HomeIcon, LineIcon, MySelectedIcon } from '../_commons/Icons';
import Home from '../home/Home';
import LinesNav from '../lines/LinesNav';
import MyNav from '../my/MyNav';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {

    const { navigation } = props;

    return (
        <DrawerContentScrollView { ...props }>

            {/* <DrawerItemList { ...props } /> */}

            <DrawerItem
                style={ styles.drawer.item.view }
                labelStyle={ styles.drawer.item.text }
                icon={ () => <HomeIcon { ...styles.drawer.item.icon } /> }
                label="Home"
                onPress={ () => navigation.navigate( 'Home' ) }
            />

            <DrawerItem
                style={ styles.drawer.item.view }
                labelStyle={ styles.drawer.item.text }
                label="Lines"
                icon={ () => <LineIcon { ...styles.drawer.item.icon } /> }
                onPress={ () => { 
                    removeNavigationState( navigation );
                    navigation.navigate( 'Lines' );
                } }
            />

            <DrawerItem
                style={ styles.drawer.item.view }
                labelStyle={ styles.drawer.item.text }
                label="Favourites"
                icon={ () => <MySelectedIcon { ...styles.drawer.item.icon } /> }
                onPress={ () => { 
                    removeNavigationState( navigation );
                    navigation.navigate( 'Favourites' );
                } }
            />

        </DrawerContentScrollView>
    );
}

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

const AppNav = () => {

    const { cache } = useContext( CacheContext );
    const { lines } = cache;

    if ( lines.error ) { 
        Object.keys( lines ).forEach( key => delete lines[ key ] ); // clear cache in case of error to request again
    }

    return (
        <NavigationContainer ref={ navigationRef }>
            <Drawer.Navigator
    
                drawerContent={ props => <CustomDrawerContent { ...props } /> }

                initialRouteName='Home'

                screenOptions={ { 
                    drawerStyle: styles.drawer.drawer,
                    headerStyle: styles.drawer.header.view,
                    headerTintColor: styles.drawer.header.text,
                    headerTitleStyle: styles.drawer.header.text,
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