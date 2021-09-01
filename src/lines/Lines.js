import React from 'react';
import Line from './Line';

const Lines= props => {

    const { lines, group } = props;

    return (
        <>
        { lines.data.filter( line => line.LineID.substr( 0, 1 ) === group ).map( ( line, i ) => (
            <Line 
                key={ i }
                line={ line }
            />
        ) ) } 
        </>
    );
}

export default Lines;
