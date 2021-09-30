import React, { useContext, useState } from 'react';
import { MyContext } from '../my/MyContext';
import * as style from './style/my';
import { MySelectedIcon, MyDeselectedIcon } from '../_commons/Icons';
import { stopParser } from '../stops/logic/parsers';

const MyStopSelector = ( { stop } ) => {
    const { myStops, createMyStop, deleteMyStop } = useContext( MyContext );
    // console.log( 'myStops', myStops );

    const [ isMyStop, setIsMyStop ] = useState( 
        myStops.map( myStop => myStop.StopCode ).includes( stop.StopCode )
    );

    const toggleMyStop = () => {
        const newIsMyStop = ! isMyStop;
        newIsMyStop 
            ? createMyStop( stopParser( stop ) ) 
            : deleteMyStop( stopParser( stop ) );
        setIsMyStop( newIsMyStop );
    }

    return (
       isMyStop
            ? <MySelectedIcon { ...style.icon } onPress={ toggleMyStop } />
            : <MyDeselectedIcon { ...style.icon } onPress={ toggleMyStop } />
    );
}

export default MyStopSelector;