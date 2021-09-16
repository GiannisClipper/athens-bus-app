import { StyleSheet } from 'react-native';
import patterns from '../_commons/stylePatterns';

const pattern = {

    main: {
        ...patterns.main,
    },

    box: {
        borderWidth: 2,
        borderColor: 'skyblue',
        // backgroundColor: 'skyblue',
    },
    nameBox: {
        alignSelf: 'center',
    },
    bigText: {
        color: 'steelblue',
        fontSize: 20,
    },
    smallText: {
        color: 'steelblue',
        fontSize: 12,
        textAlign: 'center',
    },
    verySmallText: {
        color: 'steelblue',
        fontSize: 9,
    },
    separator: {
        borderTopWidth: 1,
        borderColor: 'steelblue',
        margin: 25,
    },

};

const portrait = { 
    ...pattern,
    box: {
        ...pattern.box,
        paddingVertical: 100,
        paddingHorizontal: 20,
    },
};

const landscape = { 
    ...pattern,
    box: {
        ...pattern.box,
        paddingVertical: 20,
        paddingHorizontal: 100,
    },
};

const portraitStyles = StyleSheet.create( portrait );
const landscapeStyles = StyleSheet.create( landscape );

export { portraitStyles, landscapeStyles };