import { StyleSheet } from 'react-native';
import patterns from '../_commons/stylePatterns';

const styles = StyleSheet.create( {

    main: {
        ...patterns.main,
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