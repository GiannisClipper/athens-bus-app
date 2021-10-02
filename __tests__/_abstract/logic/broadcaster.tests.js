const { createBroadcaster } = require( '../../../src/_abstract/logic/broadcaster' );

describe( 'broadcaster', () => {

    let broad;

    beforeEach( () => {
        broad = createBroadcaster();
        broad.subscribe( console.log );
        broad.subscribe( console.log );
    } );

    test( 'subscribe a new receiver', async () => {
        const id = broad.subscribe( console.log );
        expect( id ).toBe( 3 );

        const receivers = broad.receivers;
        expect( receivers.length ).toBe( 3 );

    } );

    test( 'unsubscribe a receiver', async () => {
        const id = 1;
        broad.unsubscribe( id );

        const receivers = broad.receivers;
        expect( receivers.length ).toBe( 1 );
    } );

    test( 'incrementation of id', async () => {
        let id = 1;
        broad.unsubscribe( id );

        id = broad.subscribe( console.log );
        expect( id ).toBe( 3 );

        const receivers = broad.receivers;
        expect( receivers.length ).toBe( 2 );
    } );

    test( 'broadcast a value', async () => {
        const receiver = {
            value: null,
            store: function( passval ) {
                this.value = passval
            }
        }
        broad.subscribe( receiver.store.bind( receiver ) ); 
        // used bind() due `this` is lost when a method is running into another object: 
        // https://www.javascripttutorial.net/javascript-bind/
        expect( receiver.value ).toBe( null );
        broad.broadcast( 'test' );
        expect( receiver.value ).toBe( 'test' );
    } );

} );