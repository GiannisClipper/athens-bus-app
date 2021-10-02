import React from 'react';
import 'react-native';
import { render } from '@testing-library/react-native';
import { LineGroupsContext } from '../../src/lines/LineGroupsContext';
import { LinesContext } from '../../src/lines/LinesContext';
import LineGroups from '../../src/lines/LineGroups';
import { lineGroups } from '../data';

describe( '<LineGroups />', () => {

    test( 'render component with data', () => {
        const { data, error } = { ...lineGroups, error: null };

        const rendered = render( 
            <LineGroupsContext.Provider value={ { lineGroups: { data, error } } }>
                <LinesContext.Provider value={ {} } >
                    <LineGroups />
                </LinesContext.Provider>
            </LineGroupsContext.Provider>
        );

        const { queryByTestId, queryAllByTestId } = rendered;

        expect( queryByTestId( 'groups' ) ).not.toBeNull();
        expect( queryByTestId( 'search-row' ) ).not.toBeNull();
        expect( queryAllByTestId( 'group-row' ).length ).toBe( 2 );
    } );

    test( 'render component with error', () => { 
        const { data, error } = { ...lineGroups, data: null };
       
        const rendered = render( 
            <LineGroupsContext.Provider value={ { lineGroups: { data, error } } }>
                <LinesContext.Provider value={ {} } >
                    <LineGroups />
                </LinesContext.Provider>
            </LineGroupsContext.Provider>
        );

        const { queryByTestId, queryAllByTestId, queryByText } = rendered;
    
        expect( queryByTestId( 'groups' ) ).not.toBeNull();
        expect( queryAllByTestId( 'group-row' ).length ).toBe( 0 );
        expect( queryByText( error ) ).not.toBeNull();
    } );

} );
