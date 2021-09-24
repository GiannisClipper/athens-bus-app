import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from '../_commons/stylePatterns';
import { StopIcon, RouteIcon } from '../_commons/Icons';
import MyStops from './MyStops';
import MyRoutes from './MyRoutes';

const Tab = createBottomTabNavigator();

const MyListsNav = props => {

    const { navigation } = props;

    return (
        <>
        <Tab.Navigator 
            tabBarOptions={ {
                tabStyle: {
                    ...styles.tab.item.view
                },
            } }
            initialRouteName='MyStops'
            screenOptions={ { headerShown: false } }
        >
            <Tab.Screen 
                name='MyStops'
                component={ MyStops } 
                options={ {
                    tabBarIcon: () => <StopIcon { ...styles.tab.item.icon } />,
                    tabBarLabel: () => <Text style={ styles.tab.item.text }>Stops</Text>,
                } }
            />

            <Tab.Screen 
                name='MyRoutes' 
                component={ MyRoutes } 
                options={ {
                    tabBarIcon: () => <RouteIcon { ...styles.tab.item.icon } />,
                    tabBarLabel: () => <Text style={ styles.tab.item.text }>Routes</Text>,
                } }
            />

        </Tab.Navigator>
        </>
    );
}

export default MyListsNav;