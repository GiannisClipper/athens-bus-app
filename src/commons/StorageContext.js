import React, { createContext, useRef, useEffect } from 'react';
import useStorage from '../_abstract/useStorage';

const StorageContext = createContext();

const StorageContextProvider = props => {

    const { storage, error } = useStorage();

    async function setMyStops( value ) {
        await storage.setItem( 'myStops', JSON.stringify( value ) );
    }
    
    async function getMyStops() {
        const myStops = await storage.getItem( 'myStops' );
        const result = myStops ? JSON.parse( myStops ) : [];
        return result;
    }

    // useEffect( () => console.log( 'StorageContext rendering.' ) );

    return (
        <StorageContext.Provider value={ { storage, error, setMyStops, getMyStops } }>
            { props.children }
        </StorageContext.Provider>
    )
}

export { StorageContext, StorageContextProvider };