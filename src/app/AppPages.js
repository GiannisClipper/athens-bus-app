import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from './styles';
import AppNav from './AppNav';
import Home from '../home/Home';
import LineGroups from '../lines/LineGroups';
import MyStops from '../stops/MyStops';

const AppPages = () => {

    const [ state, setState ] = useState( { page: 'HOME' } );
    const { page } = state;
    const setPage = page => setState( { page } );

    // useEffect( () => console.log('Rendering AppPages.') );

    return (
        <>
            <AppNav setPage={ setPage } />

            <View style={ styles.main }>
                { page === 'HOME' ? <Home />
                : page === 'LINES' ? <LineGroups />
                : page === 'MySTOPS' ? <MyStops />
                : null }
            </View>
        </>

    );
}

export default AppPages;
