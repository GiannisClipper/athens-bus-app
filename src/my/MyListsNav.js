import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as style from '../_commons/style/nav';
import { StopIcon, RouteIcon } from '../_commons/Icons';
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
                component={ MyStops } 
                options={ {
                    tabBarIcon: () => <StopIcon { ...style.icon } />,
                    tabBarLabel: () => <Text style={ style.tab.item.text }>Stops</Text>,
                    tabBarInactiveBackgroundColor: style.tab.item.view.inactiveBackgroundColor,
                    tabBarActiveBackgroundColor: style.tab.item.view.activeBackgroundColor,
                } }
            />

            <Tab.Screen 
                name='MyRoutes' 
                component={ MyRoutes } 
                options={ {
                    tabBarIcon: () => <RouteIcon { ...style.icon } />,
                    tabBarLabel: () => <Text style={ style.tab.item.text }>Routes</Text>,
                    tabBarInactiveBackgroundColor: style.tab.item.view.inactiveBackgroundColor,
                    tabBarActiveBackgroundColor: style.tab.item.view.activeBackgroundColor,
                } }
            />

        </Tab.Navigator>
        </>
    );
}

export default MyListsNav;