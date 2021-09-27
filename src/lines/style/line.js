import * as colors from '../../_commons/style/colors';
import * as screen from '../../_commons/style/screen';

const { container, list, col2 } = screen;

const row = {
    ...screen.row,
    borderTopWidth: 1,
    borderTopColor: colors.smooth,
};

const col1 = {
    ...screen.col1,
    viewBus: {
        ...screen.col1.view,
        backgroundColor: colors.bus,
        opacity: 0.75,
    },
    viewTrolley: {
        ...screen.col1.view,
        backgroundColor: colors.trolley,
        opacity: 0.75,
    },
    textBus: {
        ...screen.col1.text,
        color: colors.smoother,
        fontSize: 13,
    },
    textTrolley: {
        ...screen.col1.text,
        color: colors.sharper,
        fontSize: 15,
    },
};

export { container, list, row, col1, col2 };
