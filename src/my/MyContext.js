import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';
import { RoutesContext } from '../routes/RoutesContext';
import { StopsContext } from '../stops/StopsContext';

const MyContext = createContext();

const MyContextProvider = props => {

    const [ state, setState ] = useState( null );
    const { setMyStops, getMyStops, setMyRoutes, getMyRoutes } = useContext( StorageContext );
    const { stops, saveStops } = useContext( StopsContext );
    const { routes, saveRoutes } = useContext( RoutesContext );

    const _createItem = ( key, setStorage ) =>
        item => {
            const data = [ ...state[ key ] ];
            data.push( item );
            setState( { ...state, [ key ]: data } );
            setStorage( data );
        }

    const _deleteItem = ( key, setFilter, setStorage ) =>
        item => {
            let data = [ ...state[ key ] ];
            data = data.filter( eachItem => setFilter( eachItem, item ) );
            setState( { ...state, [ key ]: data } );
            setStorage( data );
        }

    const createMyStop = _createItem( 'myStops', setMyStops );
    const deleteMyStop = _deleteItem( 'myStops', ( eachStop, stop ) => eachStop.StopCode !== stop.StopCode, setMyStops );

    const createMyRoute = _createItem( 'myRoutes', setMyRoutes );
    const deleteMyRoute = _deleteItem( 'myRoutes', ( eachRoute, route ) => eachRoute.RouteCode !== route.RouteCode, setMyRoutes );

    const updateCache = ( { myStops, myRoutes } ) => {
        // Copies the permanent favourite data in cache, considering 
        // cache is getting cleared at specific time periods.

        const myStopsAsObj = {};
        myStops.forEach( stop => myStopsAsObj[ stop.StopCode ] = stop );
        saveStops( { ...myStopsAsObj, ...stops } );

        const myRoutesAsObj = {};
        myRoutes.forEach( route => myRoutesAsObj[ route.RouteCode ] = route );                
        saveRoutes( { ...myRoutesAsObj, ...routes } );
    }

    useEffect( async () => {
        const schema = { myStops: [], myRoutes: [] }; 
        const myStops = await getMyStops( schema.myStops );
        const myRoutes = await getMyRoutes( schema.myRoutes );
        updateCache( { myStops, myRoutes } );
        setState( { myStops, myRoutes } );
    }, [] );

    useEffect( () => console.log( 'MyContext rendering.' ) );

    return (
        state ?
            <MyContext.Provider 
                value={ { 
                    myStops: state.myStops,
                    createMyStop,
                    deleteMyStop,
                    myRoutes: state.myRoutes,
                    createMyRoute,
                    deleteMyRoute,
                } }
            >
                { props.children }
            </MyContext.Provider>

        : null
    )
}

export { MyContext, MyContextProvider };