import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { usePrevious } from '../_abstract/logic/usePrevious';
import { resetNavigation } from '../_commons/logic/branchNavigation';
import { AppContext } from '../app/AppContext';
import * as style from '../_commons/style/nav';
import MyStopSelector from '../my/MyStopSelector';
import { ArrivalIcon, RouteIcon, MapIcon } from '../_commons/Icons';
import StopArrivals from './StopArrivals';
import StopRoutes from './StopRoutes';
import StopMap from './StopMap';

const Tab = createBottomTabNavigator();

const StopNav = props => {

    const { navigation } = props;
    const { stop } = props.route.params;
    // navigation.navigate() passes the parameters to the component throught `props.route.params`

    const appContext = useContext( AppContext );

    const previousRoute = usePrevious( stop );
    // to prevent reseting navigation when no previous stop exists, 
    // cause in this case screen rerenders and make same api call twice

    useEffect( () => {
        navigation.setOptions( { 
            title: `${ stop.StopDescr } (${ stop.StopCode })`,
            headerRight: () => <MyStopSelector stop={ stop } />,
        } );

        if ( previousRoute && appContext.stopNavigation ) {
            resetNavigation( appContext.stopNavigation );
        }
    }, [ stop ] );

    return (
        <>
        <Tab.Navigator 
            initialRouteName='Arrivals' 
            screenOptions={ { headerShown: false } }
        >
            <Tab.Screen 
                name='StopArrivals'
                // component={ StopArrivals }
                options={ {
                    tabBarIcon: () => <ArrivalIcon { ...style.icon } />,
                    tabBarLabel: () => <Text style={ style.tab.item.text }>Arrivals</Text>,
                    tabBarInactiveBackgroundColor: style.tab.item.view.inactiveBackgroundColor,
                    tabBarActiveBackgroundColor: style.tab.item.view.activeBackgroundColor,
                } }
            >
                { props => {
                    const { navigation } = props;
                    appContext.stopNavigation = navigation;

                    return <StopArrivals
                    { ...props }
                    stopCode={ stop.StopCode }
                /> 
                } }
            </Tab.Screen>

            <Tab.Screen 
                name='StopRoutes'
                // component={ StopRoutes }
                options={ {
                    tabBarIcon: () => <RouteIcon { ...style.icon } />,
                    tabBarLabel: () => <Text style={ style.tab.item.text }>Routes</Text>,
                    tabBarInactiveBackgroundColor: style.tab.item.view.inactiveBackgroundColor,
                    tabBarActiveBackgroundColor: style.tab.item.view.activeBackgroundColor,
                } }
            >
                { props => (
                    <StopRoutes
                        { ...props }
                        stopCode={ stop.StopCode }
                    /> 
                ) }
            </Tab.Screen>

            <Tab.Screen 
                name='StopMap'
                // component={ Home } 
                options={ {
                    tabBarIcon: () => <MapIcon { ...style.icon } />,
                    tabBarLabel: () => <Text style={ style.tab.item.text }>Map</Text>,
                    tabBarInactiveBackgroundColor: style.tab.item.view.inactiveBackgroundColor,
                    tabBarActiveBackgroundColor: style.tab.item.view.activeBackgroundColor,
                } }
            >
                { props => (
                    <StopMap
                        { ...props }
                        stopCode={ stop.StopCode }
                    /> 
                ) }
            </Tab.Screen>
        </Tab.Navigator>
        </>
    );
}

export default StopNav;