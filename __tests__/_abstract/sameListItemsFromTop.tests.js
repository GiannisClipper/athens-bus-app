const { sameListItemsFromTop } = require( '../../src/_abstract/sameListItemsFromTop' );

describe( 'sameListItemsFromTop', () => {

    test( 'three common items', async () => {
        const arr = [
            [ 'Someones', 'name', 'is', 'Giannis', 'Clipper' ],
            [ 'Someones', 'name', 'is', 'Arthur', 'but', 'not', 'the', 'king' ],
            [ 'Someones', 'name', 'is', 'Diana' ],
        ];

        const result = sameListItemsFromTop( arr );
        expect( result ).toBe( 3 );

    } );

    test( 'no common items', async () => {
        const arr = [
            [ 'My', 'name', 'is', 'Giannis', 'Clipper' ],
            [ 'Someones', 'name', 'is', 'Arthur', 'but', 'not', 'the', 'king' ],
            [ 'Someones', 'name', 'is', 'Diana' ],
        ];

        const result = sameListItemsFromTop( arr );
        expect( result ).toBe( 0 );

    } );

    test( 'no common items (first value empty)', async () => {
        const arr = [
            [],
            [ 'Someones', 'name', 'is', 'Arthur', 'but', 'not', 'the', 'king' ],
            [ 'Someones', 'name', 'is', 'Diana' ],
        ];

        const result = sameListItemsFromTop( arr );
        expect( result ).toBe( 0 );

    } );

    test( 'no common items (second value is empty)', async () => {
        const arr = [
            [ 'Someones', 'name', 'is', 'Giannis', 'Clipper' ],
            [],
            [ 'Someones', 'name', 'is', 'Arthur', 'but', 'not', 'the', 'king' ],
            [ 'Someones', 'name', 'is', 'Diana' ],
        ];

        const result = sameListItemsFromTop( arr );
        expect( result ).toBe( 0 );

    } );

    test( 'single value considered as common', async () => {
        const arr = [
            [ 'Someones', 'name', 'is', 'Giannis', 'Clipper' ],
        ];

        const result = sameListItemsFromTop( arr );
        expect( result ).toBe( 5 );

    } );

} );