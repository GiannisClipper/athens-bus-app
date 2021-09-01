import React from 'react';
import { Text } from 'react-native';
import { StorageContextProvider } from './StorageContext';
import { CacheContextProvider } from './CacheContext';

const App = () => {

    return (
        <StorageContextProvider>
            <CacheContextProvider>
                <Text>Under construction...</Text>
            </CacheContextProvider>
        </StorageContextProvider>
    );
};

export default App;
