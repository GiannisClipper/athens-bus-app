const createBroadcaster = () => {

    let _receivers = [];

    return {
        subscribe: function( callback ) {
            const length = _receivers.length
            const id = length > 0 ? _receivers[ length - 1 ].id + 1 : 1;
            _receivers.push( { id, callback } );
            return id;
        },

        unsubscribe: function( id ) {
            _receivers = _receivers.filter( item => item.id !== id );
        },

        broadcast: function( data ) {
            _receivers.forEach( receiver => receiver.callback( data ) );
        },

        get receivers() {
            return _receivers;
        }
    }
}

export { createBroadcaster };