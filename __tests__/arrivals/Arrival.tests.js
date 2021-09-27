import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StopArrival from '../../src/stops/StopArrival';

describe( '<StopArrival />', () => {

    const mockProps = {
        arrival: {
            minutes: 5,
            RouteCode: '1',
        },
        routes: {
            data: [ {
                RouteCode: '1',
                RouteDescr: 'A description of a route',
                LineID: 'An ID of a line'
            } ]
        }
    };

    test( 'render component', () => {
        const { queryByTestId, queryByText } = render( <StopArrival { ...mockProps } /> );

        expect( queryByTestId( 'arrival-row' ) ).not.toBeNull();

        const minutes = `${ mockProps.arrival.minutes }'`;
        expect( queryByText( minutes ) ).not.toBeNull();

        const descr = `[ ${ mockProps.routes.data[ 0 ].LineID } ] ${ mockProps.routes.data[ 0 ].RouteDescr }`;    
        expect( queryByText( descr ) ).not.toBeNull();
    } );

} );
