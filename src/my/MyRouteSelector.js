import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import { MyContext } from '../_commons/MyContext';

const MyRouteSelector = ( { route } ) => {
    const { myRoutes, createMyRoute, deleteMyRoute } = useContext( MyContext );
    console.log( 'myRoutes', myRoutes );

    const [ isMyRoute, setIsMyRoute ] = useState( 
        myRoutes.map( myRoute => myRoute.RouteCode ).includes( route.RouteCode )
    );

    const toggleMyRoute = () => {
        const newIsMyRoute = ! isMyRoute;
        newIsMyRoute ? createMyRoute( route ) : deleteMyRoute( route );
        setIsMyRoute( newIsMyRoute );
    }

    return (
        isMyRoute
            ? <Text onPress={ toggleMyRoute }>&#9745;</Text>
            : <Text onPress={ toggleMyRoute }>&#9744;</Text>
    );
}

export default MyRouteSelector;