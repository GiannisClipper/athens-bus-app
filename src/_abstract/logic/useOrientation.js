import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const calcOrientation = () => {

    const dims = Dimensions.get( 'screen' );

    return dims.height < dims.width
        ? 'LANDSCAPE'
        : 'PORTRAIT';
};

const useOrientation = () => {

    const [ orientation, setOrientation ] = useState( calcOrientation() );

    useEffect( () => {
        const callback = () => setOrientation( calcOrientation() );
        const listenerb = Dimensions.addEventListener( 'change', callback );
        return () => listenerb.remove(); //Dimensions.removeEventListener( 'change', callback );
    }, [] );

    return orientation;
}

export default useOrientation;