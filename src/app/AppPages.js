import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { CacheContext } from '../_commons/CacheContext';
import AppNav from './AppNav';
import Home from '../home/Home';
import LineGroups from '../lines/LineGroups';
import MyStops from '../stops/MyStops';

const AppPages = () => {

    const [ state, setState ] = useState( { isMounted: false, page: 'HOME' } );
    const { isMounted, page } = state;
    const setPage = page => setState( { isMounted: state.page === page, page } );

    const { cache } = useContext( CacheContext );
    const { lines } = cache;

    if ( lines.error ) { 
        Object.keys( lines ).forEach( key => delete lines[ key ] ); // clear cache in case of error to request again
    }

    useEffect( () => {
        if ( isMounted ) {
            setState( { ...state, isMounted: false } );
        }
    }, [ state ] );

    // useEffect( () => console.log( 'Rendering AppPages.' ) );

    return (
        <>
            <AppNav setPage={ setPage } />

            <View style={ styles.main }>
                { isMounted ? null // to unmount firstly a page when is already mounted
                : page === 'HOME' ? <Home />
                : page === 'LINES' ? <LineGroups />
                : page === 'MySTOPS' ? <MyStops />
                : null }
            </View>
        </>

    );
}

export default AppPages;
