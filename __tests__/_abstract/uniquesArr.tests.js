const { createUniquesArr } = require( '../../src/_abstract/uniquesArr' );

describe( 'uniquesArr', () => {

    let arr;

    beforeEach( () => {
        arr = createUniquesArr();
        arr.push( 'value 1' );
        arr.push( 'value 2' );
    } );

    test( 'check a value that exists', async () => {
        const result = arr.includes( 'value 2' );
        expect( result ).toBe( true );
    } );

    test( 'check a value that not exists', async () => {
        const result = arr.includes( 'value 3' );
        expect( result ).toBe( false );
    } );

    test( 'add a value that not exists', async () => {
        const result = arr.push( 'value 3' );
        expect( result ).toBe( true );
    } );

    test( 'add a value that exists', async () => {
        const result = arr.push( 'value 2' );
        expect( result ).toBe( false );
    } );

    test( 'get all values', async () => {
        const result = arr.getAll();
        expect( result.length ).toBe( 2 );
    } );

    test( 'get one value', async () => {
        const result = arr.getOne( 0 );
        expect( result ).toBe( 'value 1' );
    } );

    test( 'clear the arr', async () => {
        arr.clear();
        const result = arr.getAll();
        expect( result.length ).toBe( 0 );
    } );

} );