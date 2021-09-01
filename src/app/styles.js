import { StyleSheet } from 'react-native';
import patterns from '../commons/stylePatterns';

const styles = StyleSheet.create( {

    main: {
        color: 'steelblue',
        backgroundColor: 'powderblue',
        flex: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',  
    },

    navPanel: {
        ...patterns.navPanel,
    },
    navItem: {
        ...patterns.navItem,
    },
    navItemIcon: {
        ...patterns.navItemIcon,
    },
    navItemText: {
        ...patterns.navItemText,
    },
    navSeparator: {
        ...patterns.navSeparator,
    },

} );

export default styles;