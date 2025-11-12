import { Colors } from '../../constants/Colors';
const { dark, light } = Colors;

const commonStyle = {
    borderRadius: '5px',
    padding: '4px 4px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
    fontWeight: '500',
    display: 'inline-block',
    fontSize: '13px'
};
const Delivered = {
    backgroundColor: light.green,
    color: dark.green,
    border: `1px solid ${light.green}`,
};
const Pending = {
    backgroundColor: light.blue,
    color: dark.blue,
    border: `1px solid ${light.blue}`,
};

const Cancelled = {
    backgroundColor: light.red,
    color: dark.red,
    border: `1px solid ${light.red}`,
};

const OutofDeliverycessing = {
    backgroundColor: light.yellow,
    color: dark.yellow,
    border: `1px solid ${light.yellow}`,
};

const Shipped = {
    backgroundColor: light.purple,
    color: dark.purple,
    border: `1px solid ${light.purple}`,
};

const Completed = {
    backgroundColor: light.purple,
    color: dark.purple,
    border: `1px solid ${light.purple}`,
};

export const handleStatusesBadge = (status) => {
    if (status) {
        switch (status) {
            case 'Pending':
                return { ...commonStyle, ...Pending };
            case 'Delivered':
                return { ...commonStyle, ...Delivered };
            case 'Out of Delivery':
                return { ...commonStyle, ...OutofDeliverycessing };
            case 'Cancelled':
                return { ...commonStyle, ...Cancelled };
            case 'Shipped':
                return { ...commonStyle, ...Shipped };
            case 'Completed':
                return { ...commonStyle, ...Completed };

            default:
                return commonStyle;
        }
    }
};
