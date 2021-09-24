import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from '../_commons/stylePatterns';
import { ArrivalIcon, RouteIcon, MapIcon } from '../_commons/Icons';
import Arrivals from '../arrivals/Arrivals';
import StopRoutes from './StopRoutes';
import Home from '../home/Home';
import MyStopSelector from '../my/MyStopSelector';

const Tab = createBottomTabNavigator();

const StopNav = props => {

    const { navigation } = props;
    const { stop } = props.route.params;
    // navigation.navigate() passes the parameters to the component throught `props.route.params`

    useEffect( () => {
        navigation.setOptions( { 
            title: `${ stop.StopDescr } (${ stop.StopCode })`,
            headerRight: () => <MyStopSelector stop={ stop } />,
        } );
    }, [] );

    return (
        <>
        <Tab.Navigator 
            initialRouteName='Arrivals' 
            screenOptions={ { headerShown: false } }
        >
            <Tab.Screen 
                name='Arrivals'
                // component={ Arrivals }
                options={ {
                    tabBarIcon: () => <ArrivalIcon { ...styles.tab.item.icon } />,
                    tabBarLabel: () => <Text style={ styles.tab.item.text }>Arrivals</Text>,
                } }
            >
                { props => (
                    <Arrivals
                        { ...props }
                        stop={ stop }
                    /> 
                ) }
            </Tab.Screen>

            <Tab.Screen 
                name='StopRoutes'
                // component={ StopRoutes }
                options={ {
                    tabBarIcon: () => <RouteIcon { ...styles.tab.item.icon } />,
                    tabBarLabel: () => <Text style={ styles.tab.item.text }>Routes</Text>,
                } }
                >
                { props => (
                    <StopRoutes
                        { ...props }
                        stop={ stop }
                    /> 
                ) }
            </Tab.Screen>

            <Tab.Screen 
                name='StopMap' 
                component={ Home } 
                options={ {
                    tabBarIcon: () => <MapIcon { ...styles.tab.item.icon } />,
                    tabBarLabel: () => <Text style={ styles.tab.item.text }>Map</Text>,
                } }
            />
        </Tab.Navigator>
        </>
    );
}

export default StopNav;