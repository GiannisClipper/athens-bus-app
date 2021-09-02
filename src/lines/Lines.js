import React from 'react';
import Line from './Line';

const Lines= props => {

    const { lines, isMatch } = props;

    return (
        <>
        { lines.data.filter( line => isMatch( line ) ).map( ( line, i ) => (
            <Line 
                key={ i }
                line={ line }
            />
        ) ) } 
        </>
    );
}

export default Lines;
