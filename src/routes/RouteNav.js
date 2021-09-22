import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Stops from '../stops/Stops';
import RouteSchedule from './RouteSchedule';
import Home from '../home/Home';
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
                    tabBarIcon: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>&#9995;&#127996;</Text> ),
                    tabBarLabel: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>Stops</Text> ),
                    tabBarActiveBackgroundColor: 'powderblue',
                    tabBarInactiveBackgroundColor: 'skyblue',
                } }
            >
                { props => (
                    <Stops
                        { ...props }
                        stopNavNavigation={ navigation }
                        data={ { route } }
                    /> 
                ) }
            </Tab.Screen>

            <Tab.Screen 
                name='RouteSchedule' 
                // component={ RouteSchedule } 
                options={ {
                    tabBarIcon: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } } >[]</Text> ),
                    tabBarLabel: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>Schedule</Text> ),
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
                component={ Home } 
                options={ {
                    tabBarIcon: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } } >[]</Text> ),
                    tabBarLabel: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>Map</Text> ),
                    tabBarActiveBackgroundColor: 'powderblue',
                    tabBarInactiveBackgroundColor: 'skyblue',
                } }
            />
        </Tab.Navigator>
        </>
    );
}

export default RouteNav;