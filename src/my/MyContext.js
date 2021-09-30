import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';
import { RoutesContext } from '../routes/RoutesContext';
import { StopsContext } from '../stops/StopsContext';

const MyContext = createContext();

const MyContextProvider = props => {

    const initialState = {
        myStops: [],
        myRoutes: [],
    };

    const [ myState, setMyState ] = useState( initialState );

    const { storage, setMyStops, getMyStops, setMyRoutes, getMyRoutes } = useContext( StorageContext );
    const { stops, saveStops } = useContext( StopsContext );
    const { routes, saveRoutes } = useContext( RoutesContext );

    const _createItem = ( key, setStorage ) =>
        item => {
            const data = [ ...myState[ key ] ];
            data.push( item );
            setMyState( { ...myState, [ key ]: data } );
            setStorage( data );
        }

    const _deleteItem = ( key, setFilter, setStorage ) =>
        item => {
            let data = [ ...myState[ key ] ];
            data = data.filter( eachItem => setFilter( eachItem, item ) );
            setMyState( { ...myState, [ key ]: data } );
            setStorage( data );
        }

    const { myStops, myRoutes } = myState;

    const createMyStop = _createItem( 'myStops', setMyStops );
    const deleteMyStop = _deleteItem( 'myStops', ( eachStop, stop ) => eachStop.StopCode !== stop.StopCode, setMyStops );

    const createMyRoute = _createItem( 'myRoutes', setMyRoutes );
    const deleteMyRoute = _deleteItem( 'myRoutes', ( eachRoute, route ) => eachRoute.RouteCode !== route.RouteCode, setMyRoutes );

    const updateCache = ( { myStops, myRoutes } ) => {
        // Take care to update stops & routes cached data, considering 
        // cache is automatically removed in specific time periods.

        const myStopsAsObj = {};
        myStops.forEach( stop => myStopsAsObj[ stop.StopCode ] = stop );
        saveStops( { ...myStopsAsObj, ...stops } );

        const myRoutesAsObj = {};
        myRoutes.forEach( route => myRoutesAsObj[ route.RouteCode ] = route );                
        saveRoutes( { ...myRoutesAsObj, ...routes } );
    }

    useEffect( async () => {
        if ( storage ) {
            const myStops = await getMyStops();
            const myRoutes = await getMyRoutes();
            updateCache( { myStops, myRoutes } );
            setMyState( { myStops, myRoutes } );
        }
    }, [ storage ] );

    useEffect( () => console.log( 'MyContext rendering.' ) );

    return (
        <MyContext.Provider 
            value={ { myStops, createMyStop, deleteMyStop, myRoutes, createMyRoute, deleteMyRoute } }
        >
            { props.children }
        </MyContext.Provider>
    )
}

export { MyContext, MyContextProvider };