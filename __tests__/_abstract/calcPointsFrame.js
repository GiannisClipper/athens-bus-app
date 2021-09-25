const { calcPointsFrame } = require( '../../src/_abstract/calcPointsFrame' );

describe( 'calcPointsFrame', () => {

    test( 'with one point', async () => {
        const points = [
            [ 3, 4 ],
        ];

        const result = calcPointsFrame( points );
        expect( result ).toEqual( [ [ 3, 4 ], [ 3, 4 ] ] );

    } );

    test( 'with two points', async () => {
        const points = [
            [ 3, 4 ],
            [ 9, 2 ],
        ];

        const result = calcPointsFrame( points );
        expect( result ).toEqual( [ [ 3, 2 ], [ 9, 4 ] ] );

    } );

    test( 'with more than two points', async () => {
        const points = [
            [ 3, 4 ],
            [ 9, 2 ],
            [ 6, 5 ],
            [ 5, 6 ],
            [ 7, 2 ],
            [ 8, 3 ],
        ];

        const result = calcPointsFrame( points );
        expect( result ).toEqual( [ [ 3, 2 ], [ 9, 6 ] ] );

    } );

} );
