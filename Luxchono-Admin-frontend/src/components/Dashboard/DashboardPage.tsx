import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./style.scss"
import SavingsIcon from '@mui/icons-material/Savings';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import QueueIcon from '@mui/icons-material/Queue';
import { useBrandRevenueQuery, useGetDashboardQuery, useGetRatingQuery, useOrderCountQuery } from '../../api/Dashboard';
import ReactApexChart from 'react-apexcharts';
import Tables from '../common/Table';
import Loader from '../common/Loader';
export default function DashboardPage() {

    const { data: dashboardApiData, isLoading: dashboardLoading } = useGetDashboardQuery({});

    const { data: BrandRevenueData, isLoading: brandRevenuedLoading } = useBrandRevenueQuery({});

    const { data: OrderCount, isLoading: orderCountLoading } = useOrderCountQuery({});

    const { data: RatinngData, isLoading: RatingLoading } = useGetRatingQuery({});


    const [DashboardData, setashboardData] = useState<any>();

    const [revenueBrandName, setRevenueBrandName] = useState<any>([]);
    const [revenueBrand, setRevenueBrand] = useState<any>([]);

    const [orderStatusData, setOrderStatusData] = useState<any>([]);

    const [selectedDeleteRows, setSelectedDelteRows] = useState([]);

    const [rows, setRows] = useState<any[]>([]);
    const [selected, setSelected] = React.useState<readonly number[]>([]);

    const getSelectedDeleteRows = (rows: any) => {
        setSelectedDelteRows(rows)
    }
    const [ratingData, setRatingaData] = useState([]);
    const headCells: any[] = [
        {
            id: 'productName',
            numeric: false,
            disablePadding: true,
            label: 'Product name',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: true,
            label: 'Customer Email',
        },
        {
            id: 'star',
            numeric: true,
            disablePadding: true,
            label: 'Rating',
        },
        {
            id: 'description',
            numeric: true,
            disablePadding: true,
            label: 'Desciption',
        },
    ];


    function createData(
        productName: any,
        email: any,
        star: any,
        description: any,
    ): any {
        return {
            productName: productName,
            email: email,
            star: star,
            description: description,
        };
    }


    useEffect(() => {
        const RatinngDatas = RatinngData?.data;
        setRatingaData(RatinngDatas)
        const rowise = RatinngDatas?.map((item: any) => {

            console.log(item?.star, "itemitemitem")
            return createData(
                item?.product?.name,
                item?.user?.email,
                item?.star,
                item?.description
            );
        });
        setRows(rowise)
    }, [RatinngData])

    useEffect(() => {
        setashboardData(dashboardApiData?.data)
    }, [dashboardApiData])

    useEffect(() => {
        setOrderStatusData(OrderCount?.data || []);
        const brandNames = BrandRevenueData?.data?.map((obj: any) => obj.brand.name);
        const brandRevenue = BrandRevenueData?.data?.map((obj: any) => obj.totalBrandRevenue);
        setRevenueBrandName(brandNames)
        setRevenueBrand(brandRevenue)
    }, [BrandRevenueData, OrderCount,])

    console.log(DashboardData, "DashboardData")

    const chartOptions = {
        labels: revenueBrandName || [],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom',
                    show: false // This line hides the legend
                }
            }
        }],
    };

    // Define chart series data for the pie chart
    const chartSeries = revenueBrand || []; // Add your series data here

    const barChartOptions = {
        xaxis: {
            categories: orderStatusData?.map((data: any) => data.status)
        },
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: 'rounded'
            }
        },

    };
    const barChartSeries = [{
        data: orderStatusData?.map((data: any) => data.count)
    }];

    return (
        <>
            {(!dashboardLoading || !brandRevenuedLoading || !orderCountLoading) ? (

                <div className='dashboard_main_div'>

                    <div className='mt-[1rem]'>
                        <Grid container spacing={2}>
                            <Grid item lg={3} sm={6} md={3} xs={6}>
                                <div className='box_div border-2 '>
                                    <div className='content_icon'>
                                        <SavingsIcon className='icon' />
                                    </div>
                                    <div className='content_text'>
                                        <span className='content_heading'>{"Total Revenue"}</span>
                                        <span className='content_value'>{`${DashboardData?.totalRevenue?.toLocaleString('en-IN') || "00"} ₹`}</span>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item lg={3} sm={3} md={3} xs={3}>
                                <div className='box_div border-2 '>

                                    <div className='content_icon'>
                                        <QueueIcon className='icon' />
                                    </div>

                                    <div className='content_text'>
                                        <span className='content_heading'>{"Total Order"}</span>
                                        <span className='content_value'>{DashboardData?.totalOrder?.toLocaleString('en-IN') || "00"}</span>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item lg={3} sm={3} md={3} xs={3}>
                                <div className='box_div border-2 '>

                                    <div className='content_icon'>
                                        <ProductionQuantityLimitsIcon className='icon' />
                                    </div>

                                    <div className='content_text'>
                                        <span className='content_heading'>{"Total Product"}</span>
                                        <span className='content_value'>{DashboardData?.totalProduct?.toLocaleString('en-IN') || "00"}</span>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item lg={3} sm={3} md={3} xs={3}>
                                <div className='box_div border-2 '>

                                    <div className='content_icon'>
                                        <MarkChatReadIcon className='icon' />
                                    </div>

                                    <div className='content_text'>
                                        <span className='content_heading'>{"Total Brand"}</span>
                                        <span className='content_value'>{DashboardData?.totalBrand?.toLocaleString('en-IN') || "00"}</span>
                                    </div>

                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div className='mt-[1rem] chart_main_div'>
                        <Grid container spacing={2}>
                            <Grid item lg={6} sm={12} md={6} xs={12}>
                                <div >
                                    <span className='chart_box_heading'>Brand wise Revenue :</span>
                                </div>
                                <div className='box_div border-2 brand_chart_box mt-[0.4rem]'>
                                    <div className='pie_chart_div'>
                                        <ReactApexChart options={chartOptions} series={chartSeries} type="pie" height={350} width={400} />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item lg={6} sm={12} md={6} xs={12}>
                                <div >
                                    <span className='chart_box_heading'>Order status count :</span>
                                </div>
                                <div className='box_div border-2 box_div border-2 brand_chart_box mt-[0.4rem]'>

                                    <div className='pie_chart_div'>
                                        <ReactApexChart options={barChartOptions} series={barChartSeries} type="bar" height={250} width={500} />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div>

                    </div>

                    <div className='tables_div'>
                        <span className='tables_heading'>{"Customer Review :"}</span>
                        <div className='mt-[0.4rem]'>
                            <Tables selected={selected} setSelected={setSelected} Rating={"rating"} getSelectedDeleteRows={getSelectedDeleteRows} headCells={headCells} rows={rows} isFetching={RatingLoading} />
                        </div>
                    </div>

                </div >
            ) : (<div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}>
                <Loader />
            </div>)}


        </>

    )
}
