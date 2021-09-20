import React, { useContext, useEffect } from 'react';
// import { useIsFocused } from '@react-navigation/native';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import { lineGroupStyles as styles } from './styles';
import { CacheContext } from '../_commons/CacheContext';
import useRequest from '../_abstract/useRequest';
import { URI } from '../_commons/constants';
import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import LineSearch from './LineSearch';
import LineGroup from './LineGroup';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );

const parseGroups = data => {
    const groups = {};

    for ( const row of data ) {
        const group = row.LineID.substr( 0, 1 );
        groups[ group ] = true;
    }

    return Object.keys( groups );
}

const LineGroups = ( { navigation } ) => {

    // const isFocused = useIsFocused();

    // useEffect( () => {
    //     alert( 'isFocused' )
    // } , [ isFocused ] )

    const { cache } = useContext( CacheContext );
    const { lines } = cache;

    const { status } = useRequest( {

        uri: URI.LINES,

        normalize: data => {
            lines.groups = parseGroups( data );
            return data.map( row => ( {
                LineCode: row.LineCode,
                LineID: row.LineID,
                LineDescr: row.LineDescr,
                routes: {},
            } ) );
        },

        store: lines,
    } );
    
    return (
        <Main testID='groups'>

        { status.isRequesting ?
            <WorkingIndicator />

        : status.hasData ?
            <List>
                <LineSearch
                    key={ -1 }
                    lines={ lines }
                />

                { lines.groups.map( ( group, i ) => (
                    <LineGroup 
                        key={ i }
                        lines={ lines }
                        group={ group }
                        navigation={ navigation }
                    />
                ) ) }
            </List>

        : status.hasError ?
            <ErrorMessage>{ lines.error }</ErrorMessage>

        : null }

        </Main>
    );
}

export default LineGroups;
