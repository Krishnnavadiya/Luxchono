import { Colors } from "../../constants/Colors"

const { dark, light } = Colors;

const commonStyle: any = {
    borderRadius: "5px",
    padding: "3px 3px",
    textAlign: "center",
    width: "110px",
    whiteSpace: "nowrap",
    textTransform: "capitalize",
    fontWeight: "500",
    display: "inline-block",
    fontSize: "14px"
};
const Delivered: any = {
    backgroundColor: light.green,
    color: dark.green,
    border: `1px solid ${light.green}`,
};
const Pending: any = {
    backgroundColor: light.blue,
    color: dark.blue,
    border: `1px solid ${light.blue}`,
};

const Cancelled: any = {
    backgroundColor: light.red,
    color: dark.red,
    border: `1px solid ${light.red}`,
};

const OutofDeliverycessing: any = {
    backgroundColor: light.yellow,
    color: dark.yellow,
    border: `1px solid ${light.yellow}`,
};

const Shipped: any = {
    backgroundColor: light.purple,
    color: dark.purple,
    border: `1px solid ${light.purple}`,
};

const Completed: any = {
    backgroundColor: light.purple,
    color: dark.purple,
    border: `1px solid ${light.purple}`,
};

export const handleStatusesBadge = (status: any) => {
    if (status) {
        switch (status) {
            case "Pending":
                return { ...commonStyle, ...Pending };
            case "Delivered":
                return { ...commonStyle, ...Delivered };
            case "Out of Delivery":
                return { ...commonStyle, ...OutofDeliverycessing };
            case "Cancelled":
                return { ...commonStyle, ...Cancelled };
            case "Shipped":
                return { ...commonStyle, ...Shipped };
            case "Completed":
                return { ...commonStyle, ...Completed };

            default:
                return commonStyle;
        }
    }
};
