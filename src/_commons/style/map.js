import * as colors from './colors';

const container = {
    position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
    alignItems: 'center',  
    justifyContent: 'flex-end',
};

const map = {
    position: 'absolute',  
    top: 0,  
    left: 0,
    right: 0,  
    bottom: 0,
};

const marker = {
    marker: {
        // pinColor: colors.marker,
    },
    icon: {
        size: 28,
        color: colors.marker,
    },
};

const polyline = {
    strokeWidth: 2,
    strokeColor: colors.polyline,
};

export { container, map, marker, polyline };