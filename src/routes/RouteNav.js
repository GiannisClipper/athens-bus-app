import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Stops from '../stops/Stops';
import Home from '../home/Home';

const Tab = createBottomTabNavigator();

const RouteNav = props => {

    const { navigation } = props;
    const navigatorRoute = props.route;
    const { route } = navigatorRoute.params;  // attention: navigator route vs bus route

    console.log( 'route', route )
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
                    tabBarIcon: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>&#9995;&#127996;</Text> ),
                    tabBarLabel: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>Stops</Text> ),
                } }
            >
                { props => {
                    navigation.setOptions( { 
                        title: `[ ${ route.LineID } ]   ${ route.RouteDescr }` 
                    } );

                    return (
                        <Stops
                            { ...props }
                            // parentNavigation={ navigation }
                            busRoute={ route }
                        /> 
                    );
                } }
            </Tab.Screen>

            <Tab.Screen 
                name='RouteSchedule' 
                component={ Home } 
                options={ {
                    tabBarIcon: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } } >[]</Text> ),
                    tabBarLabel: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>Schedule</Text> ),
                } }
            />

            <Tab.Screen 
                name='RouteMap' 
                component={ Home } 
                options={ {
                    tabBarIcon: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } } >[]</Text> ),
                    tabBarLabel: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>Map</Text> ),
                } }
            />
        </Tab.Navigator>
        </>
    );
}

export default RouteNav;