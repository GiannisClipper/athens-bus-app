import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import { MyContext } from '../_commons/MyContext';

const MyStopSelector = ( { stop } ) => {
    const { myStops, createMyStop, deleteMyStop } = useContext( MyContext );
    console.log( 'myStops', myStops );

    const [ isMyStop, setIsMyStop ] = useState( 
        myStops.map( myStop => myStop.StopCode ).includes( stop.StopCode )
    );

    const toggleMyStop = () => {
        const newIsMyStop = ! isMyStop;
        newIsMyStop ? createMyStop( stop ) : deleteMyStop( stop );
        setIsMyStop( newIsMyStop );
    }

    return (
        isMyStop
            ? <Text onPress={ toggleMyStop }>&#9745;</Text>
            : <Text onPress={ toggleMyStop }>&#9744;</Text>
    );
}

export default MyStopSelector;