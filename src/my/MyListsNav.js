import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyStops from './MyStops';
import MyRoutes from './MyRoutes';

const Tab = createBottomTabNavigator();

const MyListsNav = props => {

    const { navigation } = props;

    return (
        <>
        <Tab.Navigator 
            initialRouteName='MyStops' 
            screenOptions={ { headerShown: false } }
        >
            <Tab.Screen 
                name='MyStops'
                options={ {
                    tabBarIcon: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>&#9995;&#127996;</Text> ),
                    tabBarLabel: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>Stops</Text> ),
                } }
            >
                { props => 
                    <MyStops
                        { ...props }
                        stopNavNavigation={ navigation }
                    /> 
                }
            </Tab.Screen>

            <Tab.Screen 
                name='MyRoutes' 
                options={ {
                    tabBarIcon: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } } >[]</Text> ),
                    tabBarLabel: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>Routes</Text> ),
                } }
            >
                { props => 
                    <MyRoutes
                        { ...props }
                        routeNavNavigation={ navigation }
                    /> 
                }
            </Tab.Screen>
        </Tab.Navigator>
        </>
    );
}

export default MyListsNav;