export const categoryFromDataApi = {
  createCategory: (body: any) => {
    const formData = new FormData();
    formData.append("name", body.name);
    formData.append("image", body.image);
    formData.append("icon", body.icon);
    return formData;
  },
};

export const brandFromDataApi = {
  createBrand: (body: any) => {
    const formData = new FormData();
    formData.append("name", body.name);
    formData.append("image", body.image);
    formData.append("icon", body.icon);
    return formData;
  },
};

export const productFromDatApi = {
  createProduct: (body: any) => {
    const formData = new FormData();

    if (Array.isArray(body.category)) {
      body.category.forEach((categoryItem: any, index: any) => {
        formData.append(`category[${index}]`, categoryItem);
      });
    } else {
      formData.append("category", body.category);
    }

    if (Array.isArray(body.image)) {
      body.image.forEach((image: any, index: any) => {
        formData.append(`image`, image);
      });
    } else {
      formData.append("image", body.image);
    }

    body.dummyPrice && formData.append("dummyPrice", body.dummyPrice);
    formData.append("name", body.name);
    formData.append("description", body.description);
    formData.append("stock", body.stock);
    formData.append("brand", body.brand);
    formData.append("price", body.price);
    formData.append("productModel", body.productModel);
    formData.append("warranty", body.warranty);
    formData.append("thumbnail", body.thumbnail);
    formData.append("isActive", body.isActive);
    return formData;
  },
};

export const OfferFromDataApi = {
  createOffer: (body: any) => {
    const formData = new FormData();

    formData.append("image", body.image);
    formData.append("name", body.name);
    formData.append("percentage", body.percentage);
    formData.append("description", body.description);
    formData.append("startDate", body.startDate);
    formData.append("endDate", body.endDate);
    formData.append("product", body.product);

    return formData;
  },
};
