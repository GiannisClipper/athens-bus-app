import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';

const LineGroupsContext = createContext();

const LineGroupsContextProvider = props => {

    const [ state, setState ] = useState( null );
    const { setLineGroups, getLineGroups } = useContext( StorageContext );
    
    const saveLineGroups = lineGroups => {
        setLineGroups( lineGroups );
        setState( lineGroups );
    }

    useEffect( async () => {
        const schema = { data: null, error: null };    
        const lineGroups = await getLineGroups( schema );
        // if ( ! lineGroups.error ) {
            setState( lineGroups );
        // }
    }, [] );

    useEffect( () => console.log( 'LineGroupsContext rendering.' ) );

    return (
        state ?
            <LineGroupsContext.Provider 
                value={ { 
                    lineGroups: state, 
                    saveLineGroups 
                } }
            >
                { props.children }
            </LineGroupsContext.Provider>
        
        : null
    );
}

export { LineGroupsContext, LineGroupsContextProvider };