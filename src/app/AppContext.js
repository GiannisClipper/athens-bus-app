import React, { createContext, useRef, useEffect } from 'react';

const AppContext = createContext();

const AppContextProvider = props => {

    const appContextRef = useRef( {} );

    useEffect( () => console.log( 'AppContext rendering.' ) );

    return (
        <AppContext.Provider value={ appContextRef.current }>
            { props.children }
        </AppContext.Provider>
    );
}

export { AppContext, AppContextProvider };