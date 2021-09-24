const createUniquesArr = () => {

    const _arr = [];

    return {
        includes: function( passval ) {
            const result = _arr.filter( val => val === passval );
            return result.length > 0;
        },

        push: function( passval ) {
            if ( ! this.includes( passval ) ) {
               _arr.push( passval );
                return true;
            }
            return false;
        },

        getAll: function() { return _arr },

        getOne: function( i ) { return _arr[ i ] },

        clear: function() { _arr.splice( 0, _arr.length) },
        // details on different ways to clear an array:
        // https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript?rq=1
    }
}

export { createUniquesArr };
