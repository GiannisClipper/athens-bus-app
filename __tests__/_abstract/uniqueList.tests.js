const { createUniqueList } = require( '../../src/_abstract/uniqueList' );

describe( 'uniqueList', () => {

    let list;

    beforeEach( () => {
        list = createUniqueList();
        list.push( 'value 1' );
        list.push( 'value 2' );
    } );

    test( 'check a value that exists', async () => {
        const result = list.includes( 'value 2' );
        expect( result ).toBe( true );
    } );

    test( 'check a value that not exists', async () => {
        const result = list.includes( 'value 3' );
        expect( result ).toBe( false );
    } );

    test( 'add a value that not exists', async () => {
        const result = list.push( 'value 3' );
        expect( result ).toBe( true );
    } );

    test( 'add a value that exists', async () => {
        const result = list.push( 'value 2' );
        expect( result ).toBe( false );
    } );

    test( 'get all values', async () => {
        const result = list.getAll();
        expect( result.length ).toBe( 2 );
    } );

    test( 'get one value', async () => {
        const result = list.getOne( 0 );
        expect( result ).toBe( 'value 1' );
    } );

    test( 'clear the list', async () => {
        list.clear();
        const result = list.getAll();
        expect( result.length ).toBe( 0 );
    } );

} );