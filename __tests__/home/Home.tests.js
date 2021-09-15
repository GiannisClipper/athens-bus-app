import 'react-native';import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Home from '../../src/home/Home'

describe('<Home />', () => {

    let queryByTestId;

    beforeEach( () => {
        const rendered = render( <Home /> );
        queryByTestId = rendered.queryByTestId;
    } );
      
    test( 'rendered box', () => {
        const box = queryByTestId( 'home-box' );
        expect( box ).not.toBeNull();
        expect( box.props.style.borderWidth ).toBe( 2 );
        expect( box.props.style.borderColor ).toBe( 'skyblue' );
    } );

    test( 'rendered title', () => {
        const title = queryByTestId( 'home-title' );
        expect( title ).not.toBeNull();
        expect( title.props.children ).toBe( 'ATHENS BUS' );
    } );

    test( 'rendered subtitle', () => {
        const subtitle = queryByTestId( 'home-subtitle' );
        expect( subtitle ).not.toBeNull();
        expect( subtitle.props.children ).toBe( '1.0.2-beta' );
    } );

} );
