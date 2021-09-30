import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';

const LinesContext = createContext();

const LinesContextProvider = props => {

    const initialState = {};

    const [ state, setState ] = useState( initialState );

    const { storage, setLines, getLines } = useContext( StorageContext );

    const saveLines = lines => {
        setLines( lines );
        setState( lines );
    }

    useEffect( async () => {
        if ( storage ) {
            const lines = await getLines();
            if ( ! lines.error ) {
                setState( lines );
            }
        }
    }, [ storage ] );

    useEffect( () => console.log( 'LinesContext rendering.' ) );

    return (
        <LinesContext.Provider 
            value={ { 
                lines: state, 
                saveLines 
            } }
        >
            { props.children }
        </LinesContext.Provider>
    )
}

export { LinesContext, LinesContextProvider };