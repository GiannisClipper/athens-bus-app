import React, { useContext, useRef, useEffect } from 'react';
import { CacheContext } from '../_commons/CacheContext';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from '../home/Home';
import LinesNav from '../lines/LinesNav';
import MyNav from '../my/MyNav';
// import styles from '../_commons/styles';

const styles = {

    drawer: {
        backgroundColor: 'powderblue',
        width: '44%',
    },

    header: {
        view: {
            backgroundColor: 'steelblue',
        },
        text: {
            color: 'skyblue',
            fontWeight: '600',
        }    
    },

    item: {
        view: {
        },
        text: {
            color: 'steelblue',
            fontWeight: '600',
        }    
    },
};


const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {

    const { navigation } = props;

    return (
        <DrawerContentScrollView { ...props }>

            {/* <DrawerItemList { ...props } /> */}

            <DrawerItem
                style={ styles.item.view }
                labelStyle={ styles.item.text }
                label="Home"
                onPress={ () => navigation.navigate( 'Home' ) }
            />

            <DrawerItem
                style={ styles.item.view }
                labelStyle={ styles.item.text }
                label="Lines"
                onPress={ () => { 
                    removeNavigationState( navigation );
                    navigation.navigate( 'Lines' );
                } }
            />

            <DrawerItem
                style={ styles.item.view }
                labelStyle={ styles.item.text }
                label="Favourites"
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
        <NavigationContainer>
            <Drawer.Navigator
    
                drawerContent={ props => <CustomDrawerContent { ...props } /> }

                initialRouteName='Home'

                screenOptions={ { 
                    drawerStyle: styles.drawer,
                    headerStyle: styles.header.view,
                    headerTintColor: styles.header.text,
                    headerTitleStyle: styles.header.text,
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