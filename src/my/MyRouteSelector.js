import React, { useContext, useState } from 'react';
import { MyContext } from '../_commons/MyContext';
import stylePatterns from '../_commons/stylePatterns';
import { MySelectedIcon, MyDeselectedIcon } from '../_commons/Icons';

const MyRouteSelector = ( { route } ) => {
    const { myRoutes, createMyRoute, deleteMyRoute } = useContext( MyContext );
    // console.log( 'myRoutes', myRoutes );

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
            ? <MySelectedIcon { ...stylePatterns.tab.item.icon } onPress={ toggleMyRoute } />
            : <MyDeselectedIcon { ...stylePatterns.tab.item.icon } onPress={ toggleMyRoute } />
    );
}

export default MyRouteSelector;