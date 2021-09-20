import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import { StorageContext } from '../_commons/StorageContext';
import { CacheContext } from '../_commons/CacheContext';

const MyStopSelector = ( { stop } ) => {
    const { setMyStops } = useContext( StorageContext );
    const { cache, createMyStop, deleteMyStop } = useContext( CacheContext );
    const { myStops } = cache;

    const [ isMyStop, setIsMyStop ] = useState( 
        myStops.data.map( myStop => myStop.StopCode ).includes( stop.StopCode )
    );

    const toggleMyStop = () => {
        const newIsMyStop = ! isMyStop;
        newIsMyStop ? createMyStop( stop ) : deleteMyStop( stop );
        setMyStops( myStops.data );
        console.log( 'myStops.data',myStops.data )
        setIsMyStop( newIsMyStop );
    }

    return (
        isMyStop
            ? <Text onPress={ toggleMyStop }>&#9745;</Text>
            : <Text onPress={ toggleMyStop }>&#9744;</Text>
    );
}

export default MyStopSelector;