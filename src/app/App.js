import React, { useEffect } from 'react';
import { AppContextProvider } from './AppContext';
import AppLoad from './AppLoad';

const App = () => {

    useEffect( () => console.log( 'Rendering App.' ) );

    return (
        <AppContextProvider>
            <AppLoad />
        </AppContextProvider>
    );
};

export default App;
