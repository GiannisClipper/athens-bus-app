const arrNotEqualAt = arr => {

    let i, j;

    for ( i = 0; i < arr[ 0 ].length; i++ ) {

        for ( j = 1; j < arr.length; j++ ) {

            if ( arr[ j ][ i ] !== arr[ 0 ][ i ] ) {
                break;
            }
        }

        if ( j < arr.length ) {
            break;
        }
    }

    return i;
}

export { arrNotEqualAt };