import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.scss"; // Import your CSS file
import { Grid } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CustomeCarousel from "../common/CustomeCarousel";
import ProductBox from "../common/ProductBox";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Partners from "../../assets/image/partners.png";
import Slider from "react-infinite-logo-slider";
import { useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import { actions } from "../../redux/store";
import OrderConformModal from "../common/OrderConformModal";
import { useGetLikeProductQuery, useGetProductQuery } from "../../api/Product";
import { useGetAllBrandApiQuery } from "../../api/Brand";
import LoginAlertModal from "../common/LoginAlertModal";

export default function HomePage() {
  // call product api

  const { data: PopularProductApiData, isFetching: PopularProductFetching } =
    useGetProductQuery({ size: 8 });

  const { data: FeaturedProductApiData, isFetching: FeaturedProductFetching } =
    useGetProductQuery({ size: 6 });

  const { data: LikeProductApiData, isFetching: likeProductFetching } =
    useGetLikeProductQuery();

  const { data: brandApiData, isFetching: brandFetching } =
    useGetAllBrandApiQuery();

  const [popularProductData, setPopularProductData] = useState([]);
  const [featuredProductData, setFeaturedProductData] = useState([]);
  const [brandData, setBrandData] = useState([]);


  const partnersImages = [
    {
      url: Partners,
    },
    {
      url: Partners,
    },
    {
      url: Partners,
    },
    {
      url: Partners,
    },
  ];

  const hello = () => {
    actions.loder.setLoading(true);
  };

  const ViewAllProduct = () => {
    navigate("/products");
  };

  const open = () => {
    console.log(window);
  };

  return (
    <>
      <div style={{ marginTop: "4rem" }} onClick={open}>
        <Carousel
          infiniteLoop={true}
          showThumbs={false}
          autoPlay={true}
          showStatus={false}
        >
          {images.map((image, index) => (
            <div
              className="slider_images"
              key={index}
              style={{ height: "100%", width: "100%", overflow: "hidden" }}
            >
              <img
                className="slider_image"
                src={image.url}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="popular_div flex justify-between items-center">
        <div className="flex gap-[3px] items-center">
          <span
            className="popular_span underline  decoration-main"
            onClick={() => actions.modal.openOrderConformModal()}
          >
            {"Popular"}
          </span>
          <span className="popular_span2 ">{"Watches"}</span>
        </div>

        <div
          className="flex  gap-[5px] view_div  cursor-pointer"
          onClick={ViewAllProduct}
        >
          <span className="text-hide !font-bold text-[16px]">View All</span>
          <div>
            <ArrowCircleRightOutlinedIcon
              className="text-main "
              style={{ fontSize: "19px" }}
            />
          </div>
        </div>
      </div>

      <div className="pwatch_div m-[1rem]">
        <Grid container spacing={4} className="pwatch_grid">
          {popularProductData?.map((productItem, index) => {
            return (
              <>
                <Grid item xs={12} lg={3} md={4} sm={6}>
                  <ProductBox
                    productItem={productItem}
                    LikeProductApiData={LikeProductApiData}
                  />
                </Grid>
              </>
            );
          })}
        </Grid>
      </div>

      <div className="mt-[1rem]">
        <CustomeCarousel images={images} />
      </div>

      <div className="featur_div flex justify-between items-center">
        <div className="flex gap-[3px] items-center">
          <span className="featur_span underline  decoration-main">
            {"Featured"}
          </span>
          <span className="featur_span2 ">{"Watches"}</span>
        </div>

        <div
          className="flex gap-[5px] view_div cursor-pointer"
          onClick={ViewAllProduct}
        >
          <span className="text-hide !font-bold text-[16px] cursor-pointer">
            View All
          </span>
          <div>
            <ArrowCircleRightOutlinedIcon
              className="text-main "
              style={{ fontSize: "19px" }}
            />
          </div>
        </div>
      </div>

      <div className="fwatch_div m-[1rem]">
        <Grid container spacing={4} className="pwatch_grid">
          {featuredProductData?.map((productItem, index) => {
            return (
              <>
                <Grid item xs={12} lg={3} md={4} sm={6}>
                  <ProductBox
                    productItem={productItem}
                    LikeProductApiData={LikeProductApiData}
                  />
                </Grid>
              </>
            );
          })}
        </Grid>
      </div>

      <div className="official_div flex gap-[5px] justify-center items-center">
        <div>
          <span className="!font-bold text-[23px] underline  decoration-main">
            {"Official Partners"}
          </span>
        </div>
        <div>
          <HandshakeIcon className="text-main" style={{ fontSize: "35px" }} />
        </div>
      </div>

      <div className="mt-[1rem]">
        <Slider
          width="250px"
          duration={100}
          pauseOnHover={true}
          blurBorders={false}
          blurBoderColor={"#fff"}
        >
          {brandData?.map((brand, index) => {
            return (
              <>
                <Slider.Slide>
                  <img src={brand?.icon} alt="any" className="w-[6.5rem]" />
                </Slider.Slide>
              </>
            );
          })}
        </Slider>
      </div>

      <div className="mt-[3rem] " style={{marginBottom:"-3rem"}}>
        <Grid container className="services_grid bg-darkbg mt-[3rem]">
          <Grid item xs={12} lg={3} md={6} sm={6}>
            <div className="flex flex-col gap-[10px] justify-center items-center h-[10rem] w-[100%] ">
              <GppGoodOutlinedIcon
                style={{ fontSize: "60px" }}
                className="text-secondary"
              />
              <span className="text-secondary text-[20px] !font-medium capitalize">
                {"100% ORIGINAL"}
              </span>
            </div>
          </Grid>
          <Grid item xs={12} lg={3} md={6} sm={6}>
            <div className="flex flex-col gap-[10px] justify-center items-center h-[10rem] w-[100%]">
              <LocalShippingIcon
                style={{ fontSize: "60px" }}
                className="text-secondary"
              />
              <span className="text-secondary text-[20px] !font-medium capitalize">
                {"FREE SHIPPING"}
              </span>
            </div>
          </Grid>
          <Grid item xs={12} lg={3} md={6} sm={6}>
            <div className="flex flex-col gap-[10px] justify-center items-center h-[10rem] w-[100%]">
              <BeenhereOutlinedIcon
                style={{ fontSize: "60px" }}
                className="text-secondary"
              />
              <span className="text-secondary text-[20px] !font-medium capitalize">
                {"Full Warranty"}
              </span>
            </div>
          </Grid>
          <Grid item xs={12} lg={3} md={6} sm={6}>
            <div className="flex flex-col gap-[10px] justify-center items-center h-[10rem] w-[100%]">
              <AutorenewOutlinedIcon
                style={{ fontSize: "60px" }}
                className="text-secondary"
              />
              <span className="text-secondary text-[20px] !font-medium capitalize">
                {"7-day Replacement"}
              </span>
            </div>
          </Grid>
        </Grid>
      </div>

      <OrderConformModal />
      <LoginAlertModal />
    </>
  );
}
