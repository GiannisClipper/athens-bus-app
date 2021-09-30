import React, { useContext, useState } from 'react';
import { MyContext } from '../my/MyContext';
import * as style from './style/my';
import { MySelectedIcon, MyDeselectedIcon } from '../_commons/Icons';
import { routeParser } from '../routes/logic/parsers';

const MyRouteSelector = ( { route } ) => {
    const { myRoutes, createMyRoute, deleteMyRoute } = useContext( MyContext );
    // console.log( 'myRoutes', myRoutes );

    const [ isMyRoute, setIsMyRoute ] = useState( 
        myRoutes.map( myRoute => myRoute.RouteCode ).includes( route.RouteCode )
    );

    const toggleMyRoute = () => {
        const newIsMyRoute = ! isMyRoute;
        newIsMyRoute 
            ? createMyRoute( routeParser( route ) ) 
            : deleteMyRoute( routeParser( route ) );
        setIsMyRoute( newIsMyRoute );
    }

    return (
        isMyRoute
            ? <MySelectedIcon { ...style.icon } onPress={ toggleMyRoute } />
            : <MyDeselectedIcon { ...style.icon } onPress={ toggleMyRoute } />
    );
}

export default MyRouteSelector;