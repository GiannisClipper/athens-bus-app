const { customFetch } = require( '../../../src/_abstract/logic/useRequest' );

test( 'invalid protocol', async () => {
    try {
        const uri = 'hhhhttps://telematics.oasa.gr'
        await customFetch( uri );

    } catch ( err ) {
        expect( err.toString() ).toMatch( 'TypeError' );
    }
} );

test( 'invalid uri', async () => {
    try {
        const uri = 'https://telematics.oasa.grrrr';
        await customFetch( uri );

    } catch ( err ) {
        expect( err.toString() ).toMatch( 'FetchError' );
    }
} );

test( 'valid request', async () => {
    const uri = "https://telematics.oasa.gr/api/?act=getClosestStops&p1=37.95&p2=23.70"
    const data = await customFetch( uri );
    expect( JSON.stringify( data ) ).toMatch( 'StopCode' );
} );
