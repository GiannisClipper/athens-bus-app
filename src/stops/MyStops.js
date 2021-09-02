import React, { useEffect, useState, useContext } from 'react';
import { ScrollView } from 'react-native';
import styles from './styles';
import { CacheContext } from '../_commons/CacheContext';
import { InfoMessage } from '../_commons/Messages';
import { Stop } from './Stop';

const MyStops = props => {

    const [ rerender, setRerender ] = useState( 0 );
    const { cache } = useContext( CacheContext );
    const { myStops } = cache;

    useEffect( async () => {
        myStops.info = myStops.data.length === 0 ? 'No favourite stops found.' : null;
        setRerender( rerender + 1 );
    }, [ myStops.data ] );

    return ( 
        myStops.info ?
            <InfoMessage>{ myStops.info }</InfoMessage>

        : myStops.data ?
            <ScrollView style={ styles.list }>
            { myStops.data.map( ( stop, i ) => (
                <Stop 
                    key={ i }
                    stop={ stop }
                    setRerender={ setRerender }
                />
            ) ) } 
            </ScrollView>

        : null
    );
}

export default MyStops;
