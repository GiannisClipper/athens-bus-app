const lineParser = row => ( {
    LineCode: row.LineCode,
    LineID: row.LineID,
    LineDescr: row.LineDescr,
    routeCodes: { data: null, error: null },
} );

const linesParser = data => {
    const lines = {};
    data.map( row => lines[ row.LineCode ] = lineParser( row ) );
    return lines;
}

const lineGroupsParser = data => {
    const groups = {};
    for ( row of data ) {
        const group = row.LineID.substr( 0, 1 );
        if ( ! groups[ group ] ) {
            groups[ group ] = [];
        }
        groups[ group ].push( row.LineCode );
    }

    return Object.keys( groups ).sort().map( group => ( { 
        lineGroup: group, 
        lineCodes: groups[ group ] 
    } ) );
}

export { lineParser, linesParser, lineGroupsParser };
