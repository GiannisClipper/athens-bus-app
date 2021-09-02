import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { StorageContext } from '../_commons/StorageContext';
import { CacheContext } from '../_commons/CacheContext';
import Arrivals from '../arrivals/Arrivals';

const Stop = props => {

    const { stop, setRerender } = props;

    const { setMyStops } = useContext( StorageContext );
    const { cache, createMyStop, deleteMyStop } = useContext( CacheContext );
    const { myStops } = cache;

    const [ isMyStop, setIsMyStop ] = useState( 
        myStops.data.map( myStop => myStop.StopCode ).includes( stop.StopCode )
    );

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => {
        const newIsOpen = ! isOpen;
        if ( newIsOpen ) {
            // clear cache to always request the current values
            stop.arrivals = {};
        }
        setIsOpen( newIsOpen );
    }

    const closeArrivals= () => {
        setIsOpen( false );
        if ( setRerender ) {
            setRerender();
        }
    };

    const toggleMyStop = () => {
        const newIsMyStop = ! isMyStop;
        newIsMyStop ? createMyStop( stop ) : deleteMyStop( stop );
        setMyStops( myStops.data );
        setIsMyStop( ! isMyStop )
    };

    return (
        <>
        <TouchableOpacity style={ styles.row } onPress={ onPress }>

            <View style={ styles.rowIcon }>
                <Text style={ styles.rowIconText }>&#9995;&#127996;</Text>
            </View>

            <View style={ styles.rowDescr }>
                <Text style={ styles.rowDescrText }>{ `${ stop.StopDescr } (${ stop.StopCode })` }</Text>
            </View>

        </TouchableOpacity>

        { isOpen 
            ? 
            <Arrivals 
                stop={ stop } 
                closeArrivals={ closeArrivals } 
                isMyStop={ isMyStop }
                toggleMyStop={ toggleMyStop }
            /> 
            : 
            null 
        }
        </>
    );
}

export default Stop;
