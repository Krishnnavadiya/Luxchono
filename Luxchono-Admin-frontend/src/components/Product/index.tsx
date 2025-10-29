import React, { useEffect, useState } from 'react'
import "./style.scss"
import Buttons from '../common/Buttons'
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Paper } from '@mui/material';
import Search from '../common/Search/index';
import Selects from '../common/Selects';
import Tables from '../common/Table';
import { useDeleteProductMutation, useGetAllProductQuery } from '../../api/Product';
import { useGetAllCategoryQuery } from '../../api/Category';
import { useGetAllBrandApiQuery } from '../../api/Brand';
import { STRING } from '../../constants/String';
import Dialogs from '../common/Dialogs';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { exportToCsv } from '../../constants/Helper/Csv';
import TuneIcon from '@mui/icons-material/Tune';
import ProductDrawer from './ProductFilterDrawer';

export default function ProductPage() {

    const [search, setsearch] = useState("");
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const { data: CategoryData, isFetching: CategoryFetching } = useGetAllCategoryQuery({});
    const { data: BrandData, isFetching: BrandFetching } = useGetAllBrandApiQuery({});
    const [DeleteProduct, { isLoading: deleteProductLoading }] = useDeleteProductMutation();
    const [producData, setProductData] = useState([]);
    // const [categoryData, setCategoryData] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState<any[]>([]);
    const [selectedCategoryValues, setSelectedCategoryValues] = useState<any[]>([]);
    const [searchCategoryValues, setSearchCategoryValues] = useState<any[]>([]);
    const [filteredBrand, setFilteredBrand] = useState<any[]>([]);
    const [selectedBrandValues, setSelectedBrandValues] = useState<any[]>([]);
    const [searchBrandValues, setSearchBrandValues] = useState<any[]>([]);
    const [rows, setRows] = React.useState<any[]>([]);
    const [input, setinput] = useState("");
    const navigate = useNavigate();
    const [startPrice, setStartPrice] = useState("");
    const [endPrice, setEndPrice] = useState("");
    const [startStock, setStartStock] = useState("");
    const [endStock, setEndStock] = useState("");
    const { data, isFetching, refetch } = useGetAllProductQuery({
        search: search.trim(), category: searchCategoryValues, brands: searchBrandValues, startPrice: startPrice, endPrice: endPrice, startStockRange: startStock, endStockRange: endStock
    }, { refetchOnMountOrArgChange: true, });
    const [openDeleteConfirmation, setDeleteOpenConfirmation] = useState(false);
    const [selectedDeleteRows, setSelectedDelteRows] = useState([]);
    const [selectedIdSingle, setSelectedIdSingle] = useState<number[]>([])
    const [openDeleteConfirmationSingle, setDeleteOpenConfirmationSingle] = useState(false);

    const getSelectedDeleteRows = (rows: any) => {
        setSelectedDelteRows(rows)
    }
    const handleDeleteOpenConfirmation = () => {
        setDeleteOpenConfirmation(true);
    };
    const handleDeleteCloseConfirmation = () => {
        setDeleteOpenConfirmation(false);
        setSelected([])
    };

    function createData(
        id: string | number,
        name: any,
        category: any,
        price: number,
        stock: any,
        review: any,
        thumbnail: any,
        productModel: any,
        warranty: any,
        dummyPrice: any,
        brand: any,
        image: any,
        description: any,
        categorys: any,
        brands: any,
        defaultcategory: any,
        isActive: any
    ): any {
        return {
            id: id,
            name: name,
            category: category,
            price: price,
            stock: stock,
            review: review,
            thumbnail: thumbnail,
            productModel: productModel,
            warranty: warranty,
            dummyPrice: dummyPrice,
            brand: brand,
            image: image,
            description: description,
            categorys: categorys,
            brands: brands,
            defaultcategory: defaultcategory,
            isActive: isActive
        };
    }

    useEffect(() => {
        const producData = data?.data;
        setProductData(producData)
        const rowise = producData?.map((item: any) => {
            const category = item.category.map((cat: any) => cat.name).join(' - ');
            const brands = { label: item?.brand?.name, value: item?.brand?._id };
            const defaultcategory = item.category.map((cat: any) => ({
                label: cat.name,
                value: cat._id,
            }));
            return createData(
                item._id,
                item.name,
                category,
                item.price,
                item.stock,
                item.rating,
                item.thumbnail,
                item.productModel,
                item.warranty,
                item.dummyPrice,
                item?.brand?.name,
                item.image,
                item.description,
                item.category,
                brands,
                defaultcategory,
                item.isActive
            );
        });
        setRows(rowise)
    }, [data])

    useEffect(() => {
        //set select option value 
        const filteredCategories = CategoryData?.data && (CategoryData?.data as any[]).map((category: any) => ({
            label: category.name,
            value: category._id
        }));
        setFilteredCategory(filteredCategories);

        // set serach api value 
        const values = selectedCategoryValues.map(category => category.value);
        setSearchCategoryValues(values);

    }, [CategoryData, selectedCategoryValues])

    useEffect(() => {
        const filterBrands = BrandData?.data && (BrandData?.data as any[]).map((brand: any) => ({
            label: brand.name,
            value: brand._id
        }))
        setFilteredBrand(filterBrands)
        const values = selectedBrandValues.map(brand => brand.value);
        setSearchBrandValues(values)
    }, [BrandData, selectedBrandValues])

    useEffect(() => {
        refetch()
    }, [search, refetch, searchCategoryValues, searchBrandValues, startPrice, endPrice, startStock, endStock]);

    const handleDelete = async () => {
        const response: any = await DeleteProduct({ id: selectedDeleteRows })
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message)
            setSelected([])
        } else { toast.error(message) }
        response && handleDeleteCloseConfirmation()
    }

    const headCells: any[] = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Product name',
        },
        {
            id: 'category',
            numeric: true,
            disablePadding: false,
            label: 'Category',
        },
        {
            id: 'brand',
            numeric: true,
            disablePadding: false,
            label: 'Brand',
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: false,
            label: 'Price',
        },
        {
            id: 'stock',
            numeric: true,
            disablePadding: false,
            label: 'Stock',
        },
        // {
        //     id: 'review',
        //     numeric: true,
        //     disablePadding: false,
        //     label: 'Review',
        // },
        {
            id: 'productModel',
            numeric: false,
            disablePadding: false,
            label: 'Model',
        },
        {
            id: 'warranty',
            numeric: false,
            disablePadding: false,
            label: 'Warranty',
        },
        {
            id: 'dummyPrice',
            numeric: false,
            disablePadding: false,
            label: 'Dummy Price',
        },
        {
            id: 'action',
            numeric: true,
            disablePadding: false,
            // label: 'Action',
        },
    ];

    const handleCvsExport = () => {
        const exportColumns = [
            { id: 'name', label: 'Product Name' },
            { id: 'category', label: 'Category' },
            { id: 'brand', label: 'Brand' },
            { id: 'price', label: 'Price' },
            { id: 'stock', label: 'Stock' },
            { id: 'productModel', label: 'Product Model' },
            { id: 'warranty', label: 'Warranty' },
            { id: 'dummyPrice', label: 'Dummy Price' },
        ];
        exportToCsv(rows, exportColumns, 'Product_data');
    }


    //delete single Product
    const handleDeleteSingleOpenConfirmation = (row: any) => {
        setDeleteOpenConfirmationSingle(true);
        setSelectedIdSingle([row?.id]);
    };

    const handleDeleteSingleCloseConfirmations = () => {
        setDeleteOpenConfirmationSingle(false);
        setSelectedIdSingle([])
        setSelected([])
    };

    const handleDeleteSingle = async () => {
        const response: any = await DeleteProduct({ id: selectedIdSingle })
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message)
            setSelected([])
        } else { toast.error(message) }
        response && handleDeleteSingleCloseConfirmations()
    }

    const AddProduct = () => {
        navigate("/addproduct")
    }

    //product drawer
    const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
    const toggleProductDrawer = () => {
        setIsProductDrawerOpen(!isProductDrawerOpen);
    };



    return (
        <div className='productContainer'>
            <Paper className='h-[83px] flex justify-between items-center p-[1rem] mt-[0.5rem] paperboxshadow'>
                <div className='productbtns flex justify-between'>
                    <div className='flex gap-[18px] items-center'>
                        <Buttons onClick={handleCvsExport} startIcon={<IosShareIcon />} text={"Export"} variant={"outlined"} className={"productheaderbtn1"} />
                        <div className='h-[25px] rounded-[5px]  bg-secondary '>
                            {rows && rows?.length > 0 ? (<span className='text-[14px]  p-[0.5rem] text-main '>{`(${rows?.length.toString().padStart(2, '0')}) Product Available`}</span>) : (null)}
                        </div>
                    </div>
                </div>

                <div className='flex gap-[10px]'>
                    {(selected.length > 0 && rows?.length > 0) && <Buttons onClick={handleDeleteOpenConfirmation} startIcon={<DeleteOutlineIcon />} variant={"contained"} text={
                        selectedDeleteRows?.length === 0
                            ? `${STRING.DELETE_BUTTON}`
                            : `${STRING.DELETE_BUTTON} ( ${selectedDeleteRows.length} )`
                    } className={`productheaderbtn2 ${selectedDeleteRows?.length > 0 ? '!w-[144px]' : ''
                        }`} />}
                    <Buttons onClick={AddProduct} startIcon={<ControlPointIcon />} variant={"contained"} text={"Add Product"} className="productheaderbtn2 addbtn" />
                </div>

            </Paper>

            <Paper className='paperboxshadow h-[83px] mt-[0.8rem] flex  items-center p-[1rem] gap-[10px]'>
                <Search
                    placeholder={STRING.PRODUCT_SEARCH_PLACHOLDER}
                    setinput={setinput}
                    input={input}
                    setsearch={setsearch} />
                {/* <Selects width={"250px"} height={"45px"} placeholder={"Category"} options={filteredCategory} selectedValues={selectedCategoryValues} setSelectedValues={setSelectedCategoryValues} isMulti={true} /> */}
                {/* <Selects width={"250px"} height={"45px"} placeholder={"Brand"} options={filteredBrand} selectedValues={selectedBrandValues} setSelectedValues={setSelectedBrandValues} isMulti={true} /> */}

                {/* <Box className="prices">
                    <TextFields action={() => setStartPrice('')} icons={startPrice ? <ClearIcon className='!text-[1.2rem]' /> : null} endAdornment={true} type={"number"} onChange={(e: any) => setStartPrice(e.target.value)} value={startPrice} className="price" placeholder={"Start Price"} autoComplete={'off'} />
                    <SyncAltIcon className='text-black' />
                    <TextFields action={() => setEndPrice('')} icons={endPrice ? <ClearIcon className='!text-[1.2rem]' /> : null} endAdornment={true} type={"number"} onChange={(e: any) => setEndPrice(e.target.value)} value={endPrice} className="price" placeholder={"End Price"} autoComplete={'off'} />
                </Box>

                <Box className="prices" >
                    <TextFields action={() => setStartStock('')} icons={startStock ? <ClearIcon className='!text-[1.2rem]' /> : null} endAdornment={true} type={"number"} onChange={(e: any) => setStartStock(e.target.value)} value={startStock} className="price" placeholder={"Start Stock"} autoComplete={'off'} />
                    <SyncAltIcon className='text-black' />
                    <TextFields action={() => setEndStock('')} icons={endStock ? <ClearIcon className='!text-[1.2rem]' /> : null} endAdornment={true} type={"number"} onChange={(e: any) => setEndStock(e.target.value)} value={endStock} className="price" placeholder={"End Stock"} autoComplete={'off'} />
                </Box> */}

                {/* <button className='filter_button' onClick={() => toggleProductDrawer()} >
                    <TuneIcon />
                </button> */}
            </Paper>

            <div className='mt-[1rem]'>
                <Tables handleDeleteOpen={handleDeleteSingleOpenConfirmation} selected={selected} setSelected={setSelected} Product={"Product"} getSelectedDeleteRows={getSelectedDeleteRows} search={search} headCells={headCells} rows={rows} isFetching={isFetching} />
            </div>


            <Dialogs loading={deleteProductLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmation} onClose={handleDeleteCloseConfirmation} tital={STRING.DELETE_SURE} desc={STRING.PRODUCT_DELETE_DESC} Action={handleDelete} />

            {/* single delete */}
            <Dialogs loading={deleteProductLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} tital={STRING.DELETE_SURE} desc={STRING.PRODUCT_DELETE_DESC} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmationSingle} onClose={handleDeleteSingleCloseConfirmations} Action={handleDeleteSingle} />

            {/* product filter */}

            <ProductDrawer startPrice={startPrice} endPrice={endPrice} startStock={startStock} endStock={endStock} setStartPrice={setStartPrice} setEndPrice={setEndPrice} setStartStock={setStartStock} setEndStock={setEndStock} isProductDrawerOpen={isProductDrawerOpen} toggleProductDrawer={toggleProductDrawer} />
        </div>
    )
}
