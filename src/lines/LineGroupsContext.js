import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';

const LineGroupsContext = createContext();

const LineGroupsContextProvider = props => {

    const initialState = {
        data: null,
        error: null,
    };

    const [ state, setState ] = useState( initialState );

    const { storage, setLineGroups, getLineGroups } = useContext( StorageContext );

    const saveLineGroups = lineGroups => {
        setLineGroups( lineGroups );
        setState( lineGroups );
    }

    useEffect( async () => {
        if ( storage ) {
            const lineGroups = await getLineGroups();
            if ( ! lineGroups.error ) {
                setState( lineGroups );
            }
        }
    }, [ storage ] );

    useEffect( () => console.log( 'LineGroupsContext rendering.' ) );

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