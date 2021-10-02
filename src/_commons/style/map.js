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

const polyline = {
    strokeWidth: 2,
    strokeColor: colors.polyline,
};

const marker = {
    size: 28,
    color: colors.marker,
};

const specialMarker = {
    size: 28,
    color: colors.specialMarker,
};

export { container, map, polyline, marker, specialMarker };