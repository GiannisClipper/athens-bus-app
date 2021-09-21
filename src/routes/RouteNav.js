import React, { useEffect } from 'react';
import { Text } from 'react-native';
// import { NavigationActions } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Stops from '../stops/Stops';
import Home from '../home/Home';
import MyRouteSelector from '../my/MyRouteSelector';

const Tab = createBottomTabNavigator();

const RouteNav = props => {

    const { navigation } = props;
    const { route } = props.route.params;
    // navigation.navigate() passes the parameters to the component throught `props.route.params`
    // so here `props.route` refers to a navigation property
    // while `props.route.params.route` refers to application data, a bus route

    // const onPressBack = () => navigation.reset( {
    //     index: 0,
    //     routes: [ { name: 'LineGroups' } ]
    // } );

    useEffect( () => {
        navigation.setOptions( { 
            title: `[ ${ route.LineID } ]   ${ route.RouteDescr }`,
            headerRight: () => <MyRouteSelector route={ route } />,
            // headerLeft: () => <Text onPress={ onPressBack } >Back</Text>,
        } )
    }, [] );

    // const backAction = NavigationActions.back( {
    //     key: 'RouteNav',
    // } );

    // props.navigation.dispatch( backAction );

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