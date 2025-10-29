import { Drawer } from "@mui/material";
import "./style.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.scss"
import FilterListIcon from '@mui/icons-material/FilterList';
import Buttons from "../../common/Buttons";
import TextFields from "../../common/TextFields";
import { STRING } from "../../../constants/String";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";

function ProductDrawer({ isProductDrawerOpen, toggleProductDrawer, setStartPrice, setEndPrice, setStartStock, setEndStock, startPrice, endPrice, startStock, endStock }: any) {
    useEffect(() => {
        ApplayFilter.setFieldValue("filterstartPrice", startPrice);
        ApplayFilter.setFieldValue("filterendPrice", endPrice);
        ApplayFilter.setFieldValue("filterstartStock", startStock);
        ApplayFilter.setFieldValue("filterendStock", endStock);
    }, [startPrice, endPrice, startStock, endStock, toggleProductDrawer])
    const ApplayFilter = useFormik({
        initialValues: {
            filterstartPrice: "",
            filterendPrice: "",
            filterstartStock: "",
            filterendStock: ""
        },
        validationSchema: Yup.object().shape({
        }),
        onSubmit: async (values: any) => {
            console.log(values, "values")
            values?.filterstartPrice && setStartPrice(values?.filterstartPrice || "");
            values?.filterendPrice && setEndPrice(values?.filterendPrice || "");
            values?.filterstartStock && setStartStock(values?.filterstartStock || "");
            values?.filterendStock && setEndStock(values?.filterendStock || "");
            values?.filterstartPrice === "" && setStartPrice("");
            values?.filterendPrice === "" && setEndPrice("");
            values?.filterstartStock === "" && setStartStock("");
            values?.filterendStock === "" && setEndStock("");
            toggleProductDrawer();
        },
    })

    const resetFilter = async () => {
        ApplayFilter.setFieldValue("filterstartPrice", "");
        ApplayFilter.setFieldValue("filterendPrice", "");
        ApplayFilter.setFieldValue("filterstartStock", "");
        ApplayFilter.setFieldValue("filterendStock", "");
    }

    return (
        <>
            <Drawer
                anchor="right"
                open={isProductDrawerOpen}
                transitionDuration={1000}
                sx={{
                    "& .MuiPaper-root": {
                        width: "480px",
                    },
                }}>
                <div className="categoryDrawer_contain">
                    <div className="drawer_header_wrapper ">

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <div className="filter_icon">
                                    <FilterListIcon style={{ fontSize: "30px" }} />
                                </div>
                                <p
                                    style={{
                                        marginLeft: "10px",
                                        color: "#212121",
                                        fontSize: "24px",
                                        // fontWeight: "500"
                                    }}>
                                    {STRING.ADVANCED_SEARCH}
                                </p>
                            </div>

                            <div onClick={() => toggleProductDrawer()}>
                                <CloseIcon className="cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <form onSubmit={ApplayFilter.handleSubmit}
                        className="category_form"
                        style={{ height: "100%", overflow: "auto", padding: "90px 20px" }}>

                        <div>
                            <span className="text-[17px] text-black">
                                {STRING.PRICE}
                            </span>

                            <div className="filed_div" >
                                <TextFields value={ApplayFilter.values.filterstartPrice} onChange={ApplayFilter.handleChange} name={"filterstartPrice"} endAdornment={true} type={"number"} className="price" placeholder={"Start Price"} autoComplete={'off'} />
                                <span className="text-black">{STRING.TO}</span>
                                <TextFields value={ApplayFilter.values.filterendPrice} onChange={ApplayFilter.handleChange} name={"filterendPrice"} endAdornment={true} type={"number"} className="price" placeholder={"End Price"} autoComplete={'off'} />
                            </div>
                        </div>

                        <div className="mt-[1rem]">
                            <span className="text-[17px] text-black" >
                                {STRING.STOCK}
                            </span>
                            <div className="filed_div" >
                                <TextFields value={ApplayFilter.values.filterstartStock} onChange={ApplayFilter.handleChange} name={"filterstartStock"} endAdornment={true} type={"number"} className="price" placeholder={"Start Stock"} autoComplete={'off'} />
                                <span className="text-black">{STRING.TO}</span>
                                <TextFields value={ApplayFilter.values.filterendStock} onChange={ApplayFilter.handleChange} name={"filterendStock"} endAdornment={true} type={"number"} className="price" placeholder={"End Stock"} autoComplete={'off'} />
                            </div>
                        </div>
                    </form>

                    <div className="drawer_footer">
                        {/* <Buttons text={STRING.DIALOG_CANCEL_BUTTON} variant={"outlined"} className={"Category_Cancel_btn"} onClick={() => toggleProductDrawer()} /> */}
                        <Buttons text={STRING.RESET} variant={"outlined"} className={"Category_Cancel_btn"} onClick={() => resetFilter()} />
                        <Buttons onClick={ApplayFilter.handleSubmit} type={"submit"} text={STRING.APPLAY} variant={"contained"} className={"Category_Add_btn"} />
                    </div>
                </div>
            </Drawer>
        </>
    );
}

export default ProductDrawer;
