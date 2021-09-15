import React from 'react';
import 'react-native';
import { render } from '@testing-library/react-native';
import Routes from '../../src/routes/Routes';

describe('<Routes />', () => {

    const DATA = [
        { routeDescr: 'First route descrption' },
        { routeDescr: 'Second route descrption' }
    ];

    const ERROR = 'An error message...';

    test( 'render component with data', () => {
        const rendered = render( 
            <Routes line={ { routes: { data: DATA, error: null } } } />
        );

        const { queryByTestId, queryAllByTestId } = rendered;

        expect( queryByTestId( 'routes' ) ).not.toBeNull();
        expect( queryAllByTestId( 'route-row' ).length ).toBe( 2 );
    } );

    test( 'render component with error', () => {        
        const rendered = render( 
            <Routes line={ { routes: { data: null, error: ERROR } } } />
        );

        const { queryByTestId, queryAllByTestId, queryByText } = rendered;
    
        expect( queryByTestId( 'routes' ) ).not.toBeNull();
        expect( queryAllByTestId( 'route-row' ).length ).toBe( 0 );
        expect( queryByText( ERROR ) ).not.toBeNull();
    } );
} );
