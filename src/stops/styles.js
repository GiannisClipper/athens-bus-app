import { StyleSheet } from 'react-native';
import patterns from '../_commons/stylePatterns';

const styles = StyleSheet.create( {

    main: {
        ...patterns.main,
    },

    list: {
        ...patterns.list,
    },

    row: {
        ...patterns.row,
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