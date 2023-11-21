import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import DeatilesSekelton from "../components/DeatilesSekelton";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../app/features/cartSlice";

const InfoCard = () => {
  const { id } = useParams();
  const navegate = useNavigate();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  const getProductList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products/${id}?populate=thumbnail,category&fields[0]=title&fields[1]=description&fields[2]=price`
    );
    return data;
  };
  const { isLoading, data } = useQuery(["products", id], () =>
    getProductList()
  );

  const goBack = () => navegate(-1);
 
  useEffect(() => {
    document.title = `Prducts${data?.data?.attributes?.title} Page`;
  }, []);

  if (isLoading)
    return (
      <Box maxW={"sm"} mx={"auto"} my={"20px"}>
        <DeatilesSekelton />
      </Box>
    );


    const addToCartHandeler = () => {
      dispatch(addToCart(data.data));
    };
  return (
    <div>
      <Flex
        alignItems={"center"}
        maxW={"sm"}
        mx={"auto"}
        my={7}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
      >
        <BsArrowLeftCircleFill />
        <Text ml={2}>Back</Text>
      </Flex>
      <Card
        maxW={"sm"}
        mx={"auto"}
        mb={"20px"}
        border={"1px solid #a8b5c8"}
        bg={"none"}
      >
        <CardBody>
          <Image
            src={`${import.meta.env.VITE_SERVER_URL}${
              data?.data?.attributes?.thumbnail?.data?.attributes?.url
            }`}
            alt={data?.data?.attributes?.title}
            borderRadius="lg"
            width="100%"
            height="200px"
            mx="auto"
            objectFit={"cover"}
            // fallbackSrc={imgFalBack}
          />
          <Stack mt="6" spacing="3">
            <Heading size={"md"} textAlign={"center"}>
              {data?.data?.attributes?.title}
            </Heading>
            <Text textAlign={"center"}>
              {data?.data?.attributes?.description}
            </Text>
            <Text color={"bule.300"} fontSize="2xl" textAlign="center">
              ${data?.data?.attributes?.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            onClick={addToCartHandeler}
            bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
            colorScheme="purple"
            size={"lg"}
            variant={"solid"}
            w={"full"}
            _hover={{
              bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
              color: colorMode === "light" ? "white" : "#9f7aea",
              border: "transparent",
            }}
            mt={6}
            p={8}
            textTransform={"uppercase"}
          >
            Add To Card
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InfoCard;
