import React from 'react';
import { FlatList } from 'react-native';
import Line from './Line';

const Lines= props => {

    const { lines, isMatch, navigation } = props;

    return (
        <FlatList
            testID='lines'
            data={ lines.data.filter( line => isMatch( line ) ) }
            renderItem={ ( { item } ) => ( <Line line={ item } navigation={ navigation } /> ) }
            keyExtractor={ line => line.LineCode }
        />
    );
}

export default Lines;
