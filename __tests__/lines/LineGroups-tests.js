import React from 'react';
import 'react-native';
import { render } from '@testing-library/react-native';
import { CacheContext } from '../../src/_commons/CacheContext';
import LineGroups from '../../src/lines/LineGroups';
//import { useRequestMock } from '../mock';

jest.mock( '../../src/_abstract/useRequest', () => {
    const useRequest = jest.fn( () => ( { status: { hasData: true  } } ) );
    return {
        __esModule: true,
        default: useRequest,
        useRequest,
    };
} );

describe('<LineGroups />', () => {

    let rendered;

    beforeEach( () => {
        rendered = render( 
            <CacheContext.Provider value={ { cache: { lines: { data: [], groups: [ '0', '1' ] }, myStops: {} } } } >
                <LineGroups />
            </CacheContext.Provider>
        );
    } );

    test( 'render component', () => {
        const { queryByTestId, queryAllByTestId } = rendered;

        expect( queryByTestId( 'groups' ) ).not.toBeNull();
        expect( queryByTestId( 'search-row' ) ).not.toBeNull();
        expect( queryAllByTestId( 'group-row' ).length ).toBe( 2 );
    } );
} );
