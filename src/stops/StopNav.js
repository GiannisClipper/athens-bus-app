import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
                    tabBarIcon: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>[]]</Text> ),
                    tabBarLabel: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>Arrivals</Text> ),
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
                    tabBarIcon: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } } >[]</Text> ),
                    tabBarLabel: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>Routes</Text> ),
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
                    tabBarIcon: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } } >[]</Text> ),
                    tabBarLabel: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>Map</Text> ),
                } }
            />
        </Tab.Navigator>
        </>
    );
}

export default StopNav;