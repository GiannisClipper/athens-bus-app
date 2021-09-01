import { StyleSheet } from 'react-native';
import patterns from '../commons/stylePatterns';

const styles = StyleSheet.create( {

    row: {
        ...patterns.row,
        borderTopWidth: 1,
        borderTopColor: 'skyblue',
    },
    rowIcon: {
        ...patterns.rowIcon,
    },
    rowIconText: {
        ...patterns.rowIconText,
        fontSize: 16,
    },
    rowDescr: {
        ...patterns.rowDescr,
    },
    rowDescrText: {
        ...patterns.rowDescrText,
    },

} );

export default styles;