import React from 'react';
import { StorageContextProvider } from './StorageContext';
import { CacheContextProvider } from './CacheContext';
import AppPages from './AppPages';

const App = () => {

    return (
        <StorageContextProvider>
            <CacheContextProvider>
                <AppPages />
            </CacheContextProvider>
        </StorageContextProvider>
    );
};

export default App;
