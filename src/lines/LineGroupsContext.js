import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';
// import { SettingsContext } from '../_commons/SettingsContext';

const LineGroupsContext = createContext();

const LineGroupsContextProvider = props => {

    const initialState = {
        data: null,
        error: null,
    };

    const [ state, setState ] = useState( initialState );

    const { storage, setLineGroups, getLineGroups } = useContext( StorageContext );
    // const { settings, saveSettings, isCacheValid } = useContext( SettingsContext );
    // const { cacheTimestamp } = settings;

    const saveLineGroups = lineGroups => {
        // saveSettings( { cacheTimestamp: Date.now() } );
        setLineGroups( lineGroups );
        setState( lineGroups );
    }

    useEffect( async () => {
        if ( storage ) {  // && cacheTimestamp !== null && isCacheValid() ) {
            const lineGroups = await getLineGroups();
            if ( ! lineGroups.error ) {
                // setState( lineGroups );
            }
        }
    }, [ storage,] ); // cacheTimestamp ] );

    // useEffect( () => console.log( 'LineGroupsContext rendering.' ) );

    return (
        <LineGroupsContext.Provider 
            value={ { 
                lineGroups: state, 
                saveLineGroups 
            } }
        >
            { props.children }
        </LineGroupsContext.Provider>
    )
}

export { LineGroupsContext, LineGroupsContextProvider };