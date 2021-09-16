import React from 'react';
import 'react-native';
import { render } from '@testing-library/react-native';
import { CacheContext } from '../../src/_commons/CacheContext';
import LineGroups from '../../src/lines/LineGroups';

describe('<LineGroups />', () => {

    const DATA = [];
    const ERROR = 'An error message...';
    const GROUPS = [ '0', '1' ];

    test( 'render component with data', () => {  
        const rendered = render( 
            <CacheContext.Provider value={ { cache: { lines: { data: DATA, error: null, groups: GROUPS } } } } >
                <LineGroups />
            </CacheContext.Provider>
        );

        const { queryByTestId, queryAllByTestId } = rendered;

        expect( queryByTestId( 'groups' ) ).not.toBeNull();
        expect( queryByTestId( 'search-row' ) ).not.toBeNull();
        expect( queryAllByTestId( 'group-row' ).length ).toBe( 2 );
    } );

    test( 'render component with error', () => {        
        const rendered = render( 
            <CacheContext.Provider value={ { cache: { lines: { data: null, error: ERROR } } } } >
                <LineGroups />
            </CacheContext.Provider>
        );

        const { queryByTestId, queryAllByTestId, queryByText } = rendered;
    
        expect( queryByTestId( 'groups' ) ).not.toBeNull();
        expect( queryAllByTestId( 'group-row' ).length ).toBe( 0 );
        expect( queryByText( ERROR ) ).not.toBeNull();
    } );
} );
