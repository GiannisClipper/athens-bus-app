import * as colors from '../../_commons/style/colors';
import * as screen from '../../_commons/style/screen';
import * as basics from '../../_commons/style/basics';
import * as map from '../../_commons/style/map';

const { container, list, col1, col2 } = screen;
const { icon } = basics;
const { marker, specialMarker } = map;

const row = {
    ...screen.row,
    // borderTopWidth: 1,
    // borderTopColor: colors.smooth,
};

export { container, list, row, col1, col2, icon, marker, specialMarker };
