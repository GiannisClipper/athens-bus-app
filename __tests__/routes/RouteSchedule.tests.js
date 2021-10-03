import React from 'react';
import { render } from '@testing-library/react-native';
import { RoutesContext } from '../../src/routes/RoutesContext';
import { routes } from '../data';
import RouteSchedule from '../../src/routes/RouteSchedule';

const routeCode = Object.keys( routes )[ 0 ];
const { schedule } = routes[ routeCode ];

describe( '<RouteSchedule />', () => {

    const Render = ( { routes, routeCode } ) => ( 
        <RoutesContext.Provider value={ { routes } } >
            <RouteSchedule routeCode={ routeCode } /> 
        </RoutesContext.Provider>
    );

    test( 'render component with data', () => {
        routes[ routeCode ].schedule = { ...schedule, error: null };
        const rendered = render( Render( { routes, routeCode } ) );
        const { queryByTestId, queryAllByTestId } = rendered;

        expect( queryByTestId( 'routeSchedule' ) ).not.toBeNull();
        expect( queryAllByTestId( 'routeSchedule-row' ).length ).toBe( schedule.data.length );
    } );

    test( 'render component with error', () => {   
        routes[ routeCode ].schedule = { ...schedule, data: null };
        const rendered = render( Render( { routes, routeCode } ) );
        const { queryByTestId, queryAllByTestId, queryByText } = rendered;

        expect( queryByTestId( 'routeSchedule' ) ).not.toBeNull();
        expect( queryAllByTestId( 'routeSchedule-row' ).length ).toBe( 0 );
        expect( queryByText( schedule.error ) ).not.toBeNull();

    } );

} );
