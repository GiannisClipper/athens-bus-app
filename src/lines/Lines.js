import React from 'react';
import { View } from 'react-native';
import Line from './Line';

const Lines= props => {

    const { lines, isMatch } = props;

    return (
        <View testID='lines'>

        { lines.data.filter( line => isMatch( line ) ).map( ( line, i ) => (
            <Line 
                key={ i }
                line={ line }
            />
        ) ) } 

        </View>
    );
}

export default Lines;
