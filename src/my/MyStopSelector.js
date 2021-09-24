import React, { useContext, useState } from 'react';
import { MyContext } from '../_commons/MyContext';
import stylePatterns from '../_commons/stylePatterns';
import { MySelectedIcon, MyDeselectedIcon } from '../_commons/Icons';

const MyStopSelector = ( { stop } ) => {
    const { myStops, createMyStop, deleteMyStop } = useContext( MyContext );
    // console.log( 'myStops', myStops );

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
            ? <MySelectedIcon { ...stylePatterns.tab.item.icon } onPress={ toggleMyStop } />
            : <MyDeselectedIcon { ...stylePatterns.tab.item.icon } onPress={ toggleMyStop } />
    );
}

export default MyStopSelector;