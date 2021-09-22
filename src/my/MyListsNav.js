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
                component={ MyStops } 
                options={ {
                    tabBarIcon: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>&#9995;&#127996;</Text> ),
                    tabBarLabel: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>Stops</Text> ),
                } }
            />

            <Tab.Screen 
                name='MyRoutes' 
                component={ MyRoutes } 
                options={ {
                    tabBarIcon: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } } >[]</Text> ),
                    tabBarLabel: ( { color, size } ) => ( <Text style={ { color, fontSize: size  } }>Routes</Text> ),
                } }
            />

        </Tab.Navigator>
        </>
    );
}

export default MyListsNav;