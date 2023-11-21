import { Grid } from "@chakra-ui/react";
import CardProduct from "../components/CardProduct";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import ProductSeceleton from "../components/ProductSeceleton";


const ProductPages = () => {
 

  const getProductList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products/?populate=thumbnail`
    );
    return data;
  };
  const { isLoading, data } = useQuery(["products"], () =>
    getProductList()
  );
 
  if (isLoading)
    return (
      <Grid
        margin={30}
        templateColumns={"repeat(auto-fill,minmax(300px,1fr))"}
        gap={6}
      >
        {Array.from({ length: 20 }, (_, idx) => (
          <ProductSeceleton key={idx} />
        ))}
      </Grid>
    );

    return (
    <Grid
      margin={30}
      templateColumns={"repeat(auto-fill,minmax(300px,1fr))"}
      gap={6}
    >
      {data.data.map((product) => (
        <CardProduct key={product.id} {...product} />
      ))}
    </Grid>
  );
};

export default ProductPages;
