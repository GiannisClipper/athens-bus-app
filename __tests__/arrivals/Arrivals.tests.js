import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Arrivals from '../../src/arrivals/Arrivals';

describe( '<Arrivals />', () => {

    const DATA = [];
    const ERROR = 'An error message...';

    const mockProps = {
        stop: {
            StopCode: 'A code of a stop',
            StopDescr: 'A description of a stop',
            routes: {},
            arrivals: {},
        }
    };

    test( 'render component with data', () => {
        mockProps.stop.arrivals = { data: DATA, error: null };
        mockProps.stop.routes = { data: DATA, error: null };
        const { queryByTestId } = render( <Arrivals { ...mockProps } /> );

        expect( queryByTestId( 'arrivals-nav' ) ).not.toBeNull();
        expect( queryByTestId( 'arrivals' ) ).not.toBeNull();
    } );

    test( 'render component with error', () => {        
        mockProps.stop.arrivals = { data: null, error: ERROR };
        mockProps.stop.routes = { data: null, error: ERROR };
        const { queryByTestId, queryByText } = render( <Arrivals { ...mockProps } /> );

        expect( queryByTestId( 'arrivals-nav' ) ).not.toBeNull();
        expect( queryByTestId( 'arrivals' ) ).not.toBeNull();
        expect( queryByText( ERROR + ' ' + ERROR ) ).not.toBeNull();
    } );

} );
