import React, { useEffect, useState } from 'react'
import Searchs from '../common/Search'
import "./style.scss"
import TuneIcon from '@mui/icons-material/Tune';
import { actions } from '../../redux/store';
import ProductFilterDrawer from '../common/ProductFilterDrawer';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ProductBox from '../common/ProductBox';
import { Grid } from '@mui/material';
import Buttons from '../common/Buttons';
import SearchIcon from '@mui/icons-material/Search';
import { useGetLikeProductQuery, useGetProductQuery } from '../../api/Product';
import Loader from '../common/Loader';
import LoginAlertModal from '../common/LoginAlertModal';

export default function ProductsPage() {

    const [input, setinput] = useState('');
    const [search, setsearch] = useState('');
    const [filterStartPrice, setFilterStartPrice] = useState();
    const [filterEndPrice, setFilterEndPrice] = useState();
    const [filterBeand, setFilterBeand] = useState();
    const [filterCategory, setFilterCategory] = useState();

    const { data: ProductApiData, isFetching: ProductFetching, refetch } = useGetProductQuery({
        search: search,
        startPrice: filterStartPrice,
        endPrice: filterEndPrice,
        brand: filterBeand,
        category: filterCategory
    });

    const { data: LikeProductApiData, isFetching: likeProductFetching } = useGetLikeProductQuery();
    const [productData, setProduct] = useState();

    

    return (
        <>

            <div style={{ marginTop: "5rem" }} className='products_div '>

                <div className='heading_div flex items-center gap-[5px]'  >
                    <div>
                        <span className='products_heading text-black'>Search</span>
                    </div>
                    <div>
                        <SearchIcon className='search_icon text-lighttext' />
                    </div>
                </div>

                <div className='search_div flex items-center gap-[14px]' style={{ flexWrap: "wrap" }}>
                    <Searchs height={"44px"} width={"300"} setinput={setinput}
                        input={input}
                        setsearch={setsearch}
                        placeholder={'Search'} />
                    <div className='cursor-pointer' onClick={() => actions.modal.openProductFilterDrawer()} >
                        <Buttons startIcon={<TuneIcon />} type={'submit'} text={"Filter by"} variant={'outlined'} className={'filter_btn'} />
                    </div>
                </div>

                <div className='products_div m-[1rem]'>
                    {ProductFetching && likeProductFetching ? (
                        <div className='flex justify-center items-center h-[60vh]' style={{ visibility: "hidden" }} >
                            <Loader />
                        </div>

                    ) : (ProductApiData?.data?.length ? (<Grid container spacing={4} className="pwatch_grid" >
                        {productData?.map((productItem, index) => {
                            return (
                                <>
                                    <Grid item xs={12} lg={3} md={4} sm={4}  >
                                        <ProductBox productItem={productItem} LikeProductApiData={LikeProductApiData} />
                                    </Grid>
                                </>
                            )
                        })}
                    </Grid>) : (<div className='flex items-center justify-center h-[50vh]'>
                        {(!likeProductFetching && !ProductFetching) && <div className='flex items-center gap-[5px]'>
                            <div>
                                <ErrorOutlineIcon className='text-main not_icon' />
                            </div>
                            <div>
                                <span className='text-black  not_found'>No data Found</span>
                            </div>
                        </div>}
                    </div>))}
                </div>
                {/* data not found then show this div */}
            </div>

            <ProductFilterDrawer
                setFilterStartPrice={setFilterStartPrice}
                filterStartPrice={filterStartPrice}
                setFilterEndPrice={setFilterEndPrice}
                filterEndPrice={filterEndPrice}
                setFilterBeand={setFilterBeand}
                filterBeand={filterBeand}
                setFilterCategory={setFilterCategory}
                filterCategory={filterCategory} />

            <LoginAlertModal />
        </>
    )
}
