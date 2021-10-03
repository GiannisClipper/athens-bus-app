import React from 'react';
import 'react-native';
import { render } from '@testing-library/react-native';

import { LineGroupsContext } from '../../src/lines/LineGroupsContext';
import { LinesContext } from '../../src/lines/LinesContext';
import { lineGroups } from '../data';

import LineGroups from '../../src/lines/LineGroups';

describe( '<LineGroups />', () => {

    const Render = ( { lineGroups } ) => (
        <LineGroupsContext.Provider value={ { lineGroups } }>
        <LinesContext.Provider value={ {} } >
            <LineGroups />
        </LinesContext.Provider>
        </LineGroupsContext.Provider>
    );

    test( 'render component with data', () => {
        const rendered = render( Render( { lineGroups: { ...lineGroups, error: null } } ) );
        const { queryByTestId, queryAllByTestId } = rendered;

        expect( queryByTestId( 'groups' ) ).not.toBeNull();
        expect( queryByTestId( 'search-row' ) ).not.toBeNull();
        expect( queryAllByTestId( 'group-row' ).length ).toBe( lineGroups.data.length );
    } );

    test( 'render component with error', () => { 
        const rendered = render( Render( { lineGroups: { ...lineGroups, data: null } } ) );
        const { queryByTestId, queryAllByTestId, queryByText } = rendered;
    
        expect( queryByTestId( 'groups' ) ).not.toBeNull();
        expect( queryAllByTestId( 'group-row' ).length ).toBe( 0 );
        expect( queryByText( lineGroups.error ) ).not.toBeNull();
    } );

} );
