import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from '../_commons/stylePatterns';
import { StopIcon, ScheduleIcon, MapIcon } from '../_commons/Icons';
import Stops from '../stops/Stops';
import RouteSchedule from './RouteSchedule';
import RouteMap from './RouteMap';
import MyRouteSelector from '../my/MyRouteSelector';

const Tab = createBottomTabNavigator();

const RouteNav = props => {

    const { navigation } = props;
    const { route } = props.route.params;
    // navigation.navigate() passes the parameters to the component throught `props.route.params`
    // so here `props.route` refers to a navigation property
    // while `props.route.params.route` refers to application data, a bus route

    useEffect( () => {
        navigation.setOptions( { 
            title: `[ ${ route.LineID } ]   ${ route.RouteDescr }`,
            headerRight: () => <MyRouteSelector route={ route } />,
        } )
    }, [] );

    return (
        <>
        <Tab.Navigator 
            initialRouteName='Stops' 
            screenOptions={ { 
                headerShown: false,
                tabBarItemStyle: {
                },
            } }
        >
            <Tab.Screen 
                name='Stops'
                // component={ Stops }
                options={ {
                    tabBarIcon: () => <StopIcon { ...styles.tab.item.icon } />,
                    tabBarLabel: () => <Text style={ styles.tab.item.text }>Stops</Text>,
                    tabBarActiveBackgroundColor: 'powderblue',
                    tabBarInactiveBackgroundColor: 'skyblue',
                } }
            >
                { props => (
                    <Stops
                        { ...props }
                        data={ { route } }
                    /> 
                ) }
            </Tab.Screen>

            <Tab.Screen 
                name='RouteSchedule' 
                // component={ RouteSchedule } 
                options={ {
                    tabBarIcon: () => <ScheduleIcon { ...styles.tab.item.icon } />,
                    tabBarLabel: () => <Text style={ styles.tab.item.text }>Schedule</Text>,
                    tabBarActiveBackgroundColor: 'powderblue',
                    tabBarInactiveBackgroundColor: 'skyblue',
                } }
            >
                { props => (
                    <RouteSchedule
                        { ...props }
                        data={ { route } }
                    /> 
                ) }
            </Tab.Screen>

            <Tab.Screen 
                name='RouteMap' 
                // component={ RouteMap } 
                options={ {
                    tabBarIcon: () => <MapIcon { ...styles.tab.item.icon } />,
                    tabBarLabel: () => <Text style={ styles.tab.item.text }>Map</Text>,
                    tabBarActiveBackgroundColor: 'powderblue',
                    tabBarInactiveBackgroundColor: 'skyblue',
                } }
            >
                { props => (
                    <RouteMap
                        { ...props }
                        data={ { route } }
                    /> 
                ) }

            </Tab.Screen>
        </Tab.Navigator>
        </>
    );
}

export default RouteNav;