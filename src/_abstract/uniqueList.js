const createUniqueList = () => {

    const _list = [];

    return {
        includes: function( passval ) {
            const result = _list.filter( val => val === passval );
            return result.length > 0;
        },

        push: function( passval ) {
            if ( ! this.includes( passval ) ) {
               _list.push( passval );
                return true;
            }
            return false;
        },

        getAll: function() { return _list },

        getOne: function( i ) { return _list[ i ] },

        clear: function() { _list.splice( 0, _list.length) },
        // details on different ways to clear an array:
        // https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript?rq=1
    }
}

export { createUniqueList };
