import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { resetNavigation } from '../_commons/logic/branchNavigation';
import { AppContext } from '../app/AppContext';
import * as style from '../_commons/style/nav';
import MyRouteSelector from '../my/MyRouteSelector';
import { StopIcon, ScheduleIcon, MapIcon } from '../_commons/Icons';
import Stops from '../stops/Stops';
import RouteSchedule from './RouteSchedule';
import RouteMap from './RouteMap';

const Tab = createBottomTabNavigator();

const RouteNav = props => {

    const { navigation } = props;
    const { route } = props.route.params;
    // navigation.navigate() passes the parameters to the component throught `props.route.params`
    // so here `props.route` refers to a navigation property
    // while `props.route.params.route` refers to application data, a bus route

    const appContext = useContext( AppContext );

    useEffect( () => {
        navigation.setOptions( { 
            title: `[ ${ route.LineID } ]   ${ route.RouteDescr }`,
            headerRight: () => <MyRouteSelector route={ route } />,
        } );

        if ( appContext.routeNavigation ) {
            resetNavigation( appContext.routeNavigation );
        }
    }, [ route ] );

    return (
        <>
        <Tab.Navigator
            initialRouteName='Stops'
            screenOptions={ { headerShown: false } }
        >
            <Tab.Screen 
                name='Stops'
                // component={ Stops }
                options={ {
                    tabBarIcon: () => <StopIcon { ...style.icon } />,
                    tabBarLabel: () => <Text style={ style.tab.item.text }>Stops</Text>,
                    tabBarInactiveBackgroundColor: style.tab.item.view.inactiveBackgroundColor,
                    tabBarActiveBackgroundColor: style.tab.item.view.activeBackgroundColor,
                } }
            >
                { props => {
                    const { navigation } = props;
                    appContext.routeNavigation = navigation;

                    return <Stops
                        { ...props }
                        routeCode={ route.RouteCode }
                    /> 
                } }
            </Tab.Screen>

            <Tab.Screen 
                name='RouteSchedule'
                // component={ RouteSchedule } 
                options={ {
                    tabBarIcon: () => <ScheduleIcon { ...style.icon } />,
                    tabBarLabel: () => <Text style={ style.tab.item.text }>Schedule</Text>,
                    tabBarInactiveBackgroundColor: style.tab.item.view.inactiveBackgroundColor,
                    tabBarActiveBackgroundColor: style.tab.item.view.activeBackgroundColor,
                } }
            >
                { props => (
                    <RouteSchedule
                        { ...props }
                        routeCode={ route.RouteCode }
                    /> 
                ) }
            </Tab.Screen>

            <Tab.Screen 
                name='RouteMap' 
                // component={ RouteMap } 
                options={ {
                    tabBarIcon: () => <MapIcon { ...style.icon } />,
                    tabBarLabel: () => <Text style={ style.tab.item.text }>Map</Text>,
                    tabBarInactiveBackgroundColor: style.tab.item.view.inactiveBackgroundColor,
                    tabBarActiveBackgroundColor: style.tab.item.view.activeBackgroundColor,
                } }
            >
                { props => (
                    <RouteMap
                        { ...props }
                        routeCode={ route.RouteCode }
                    /> 
                ) }

            </Tab.Screen>
        </Tab.Navigator>
        </>
    );
}

export default RouteNav;