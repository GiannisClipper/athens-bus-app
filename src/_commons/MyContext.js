import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';

const MyContext = createContext();

const MyContextProvider = props => {

    const { storage, setMyStops, getMyStops, setMyRoutes, getMyRoutes } = useContext( StorageContext );

    const initialState = {
        myStops: [],
        myRoutes: [],
    };

    const [ myState, setMyState ] = useState( initialState );

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

    useEffect( async () => {
        if ( storage ) {
            const myStops = await getMyStops();
            const myRoutes = await getMyRoutes();
            setMyState( { myStops, myRoutes } );
        }
    }, [ storage ] );

    // useEffect( () => console.log( 'MyContext rendering.' ) );

    return (
        <MyContext.Provider 
            value={ { myStops, createMyStop, deleteMyStop, myRoutes, createMyRoute, deleteMyRoute } }
        >
            { props.children }
        </MyContext.Provider>
    )
}

export { MyContext, MyContextProvider };