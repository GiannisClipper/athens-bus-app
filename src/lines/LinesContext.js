import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageContext } from '../_commons/StorageContext';

const LinesContext = createContext();

const LinesContextProvider = props => {

    const [ state, setState ] = useState( null );
    const { setLines, getLines } = useContext( StorageContext );

    const saveLines = lines => {
        setLines( lines );
        setState( lines );
    }

    useEffect( async () => {
        const schema = {};
        const lines = await getLines( schema );
        setState( lines );
    }, [] );

    useEffect( () => console.log( 'LinesContext rendering.' ) );

    return (
        state ?
            <LinesContext.Provider 
                value={ { 
                    lines: state, 
                    saveLines 
                } }
            >
                { props.children }
            </LinesContext.Provider>

        : null
    )
}

export { LinesContext, LinesContextProvider };