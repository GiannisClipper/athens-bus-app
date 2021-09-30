import React from 'react';
// import { FlatList } from 'react-native';
import { StyledScrollView } from '../_abstract/Styled';
import * as style from './style/line';

import Line from './Line';

const List = StyledScrollView( { style: style.list } );

const Lines= props => {

    const { lineCodes } = props;

    return (
        // <FlatList
        //     testID='lines'
        //     data={ lines }
        //     renderItem={ ( { item } ) => ( <Line lineCode={ item } /> ) }
        //     keyExtractor={ lineCode => lineCode }
        // />

        <List  testID='lines'>
            { lineCodes.map( ( lineCode, i ) => (
                <Line 
                    key={ i }
                    lineCode={ lineCode }
                />
            ) ) } 
        </List>
    );
}

export default Lines;
