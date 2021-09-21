import React from 'react';
import { FlatList } from 'react-native';
import Line from './Line';

const Lines= props => {

    const { lines, isMatch } = props;

    return (
        <FlatList
            testID='lines'
            data={ lines.data.filter( line => isMatch( line ) ) }
            renderItem={ ( { item } ) => ( <Line line={ item } /> ) }
            keyExtractor={ line => line.LineCode }
        />
    );
}

export default Lines;
