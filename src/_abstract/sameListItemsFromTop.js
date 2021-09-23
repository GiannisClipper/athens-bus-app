const sameListItemsFromTop = arr => {

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

// const lineDescr = {"2968": ["ΑΓ. ΒΑΣΙΛΕΙΟΣ - ΑΓ. ΣΟΦΙΑ - ΚΡΑΤ. ΝΙΚΑΙΑΣ"], "3476": ["ΛΟΦΟΣ ΒΩΚΟΥ - ΠΡ. ΗΛΙΑΣ (ΚΥΚΛΙΚΗ)"], "4084": ["ΣΧΙΣΤΟ ΚΑΡΑΒΑΣ - ΠΕΙΡΑΙΑΣ (ΚΥΚΛΙΚΗ)", "ΣΧΙΣΤΟ ΚΑΡΑΒΑΣ - ΠΕΙΡΑΙΑΣ (ΚΥΚΛΙΚΗ)", "ΣΧΙΣΤΟ ΚΑΡΑΒΑΣ - ΠΕΙΡΑΙΑΣ (ΚΥΚΛΙΚΗ)"], "4085": ["ΣΧΙΣΤΟ ΚΑΡΑΒΑΣ - ΠΕΙΡΑΙΑΣ (ΚΥΚΛΙΚΗ)", "ΣΧΙΣΤΟ ΚΑΡΑΒΑΣ - ΠΕΙΡΑΙΑΣ (ΚΥΚΛΙΚΗ)", "ΣΧΙΣΤΟ ΚΑΡΑΒΑΣ - ΠΕΙΡΑΙΑΣ (ΚΥΚΛΙΚΗ)"]}    let lineDescr = {};
// Object.keys( lineDescr ).forEach( routeCode => {
//     lineDescr[ routeCode ] = lineDescr[ routeCode ].map( descrArr => {
//         descrArr = descrArr.map( descr => descr.split( ' ' ) );
//         const common = sameListItemsFromTop( descrArr );
//         descrArr = descrArr.map( descr => descr.splice( 0, common ) );
//         descrArr = descrArr.map( descr => descr.join( ' ' ) );
//     } );
// } );

export { sameListItemsFromTop };