import * as colors from '../../_commons/style/colors';
import * as screen from '../../_commons/style/screen';
import * as basics from '../../_commons/style/basics';
import * as map from '../../_commons/style/map';

const { container, list, col1 } = screen;
const { icon } = basics;

const row = {
    ...screen.row,
    borderTopWidth: 1,
    borderTopColor: colors.smooth,
};

const col2 = {
    view: {
        ...screen.col2.view,
    },
    text: {
        ...screen.col2.text,
        fontSize: 16,
    },
};

export { container, list, row, col1, col2, icon, map };
