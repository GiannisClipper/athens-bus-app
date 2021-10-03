import React from 'react';
import { render } from '@testing-library/react-native';
import { StopsContext } from '../../src/stops/StopsContext';
import { stops } from '../data';
import Stop, { stopRepr } from '../../src/stops/Stop';

const stopCode = Object.keys( stops )[ 0 ];

describe( '<Stop />', () => {

    test( 'render component', () => {
        const rendered = render( 
            <StopsContext.Provider value={ { stops } } >
                <Stop stopCode={ stopCode } /> 
            </StopsContext.Provider>
        );
        const { queryByTestId, queryByText } = rendered;

        expect( queryByTestId( 'stop-row' ) ).not.toBeNull();
        expect( queryByText( stopRepr( stops[ stopCode ] ) ) ).not.toBeNull();
    } );

} );
