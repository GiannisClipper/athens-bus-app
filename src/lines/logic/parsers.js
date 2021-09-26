const lineParser = row => ( {
    LineCode: row.LineCode,
    LineID: row.LineID,
    LineDescr: row.LineDescr,
    routes: {},
} );

const linesParser = data =>
    data.map( row => lineParser( row ) );

const lineGroupsParser = data => {
    const groups = {};
    for ( row of data ) {
        const group = row.LineID.substr( 0, 1 );
        groups[ group ] = true;
    }
    return Object.keys( groups ).sort();
}

export { lineParser, linesParser, lineGroupsParser };
