import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import TableSkelaton from "./TableSkelaton";
import {
  useGetDashProductsQuery,
  useDelteDashProducrMutation,
  useUpdateDashboardProductsMutation,
} from "../app/services/apislice";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEditNote } from "react-icons/md";
import CustemAlertDialog from "../shared/AlertDialog";
import { useEffect, useState } from "react";
import CustomModal from "../shared/CustomModal";
import { useSelector } from "react-redux";
import { selectNetwork } from "../app/features/networkSlice";

const ProductsTable = () => {
  const {isOnLine}= useSelector(selectNetwork)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: isOnOpenModal,
    onClose: isOnClose,
  } = useDisclosure();

  const [clickedProductId, setClickedProductId] = useState(null);
  const [thubmnail, setThubmnail] = useState(null);
  const [productToEdite, setProductToEdite] = useState(null);
  const { isLoading, data, error } = useGetDashProductsQuery({ page: 1 });

  const [destoryProduct, { isLoading: isDestroying, isSuccess }] =
    useDelteDashProducrMutation();
  const [updateProduct, { isLoading: isUpdating, isSuccess :isSuccessUpdate}] =
  useUpdateDashboardProductsMutation();

  useEffect(() => {
    if (isSuccess) {
      setClickedProductId(null);
      onClose();
    }
    if (isSuccessUpdate) {
      setClickedProductId(null);
      isOnClose();
    }
  }, [isSuccess,isSuccessUpdate]);

  if (isLoading || !isOnLine) return <TableSkelaton />;

  const onChangeHandeler = (e) => {
    const { name, value } = e.target;
    setProductToEdite({
      ...productToEdite,
      [name]: value,
    });
  };

  const onChangePriceHandeler = (value) => {
    setProductToEdite({
      ...productToEdite,
      price: +value,
    });
  };
  const onChangeStockHandeler = (value) => {
    setProductToEdite({
      ...productToEdite,
      stock: +value,
    });
  };

  const onChangeThumbnailHandler = (e) => {
    setThubmnail(e.target.files[0]);
  };
  const onSubmitHandler = () => {
    console.log(productToEdite);


    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToEdite.title,
        price: productToEdite.price,
        stock: productToEdite.stock,
      })
    );
    formData.append("files.thumbnail",thubmnail)
    updateProduct({id:clickedProductId,body:formData})
  };



  return (
    <>
      <TableContainer maxW={"85%"} mx={"auto"}>
        <Table variant="simple">
          <TableCaption>Total Entrise : {data?.data?.length ?? 0}</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Caregory</Th>
              <Th>Thubnail</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.map((product) => (
              <Tr key={product.id}>
                <Td>{product?.id}</Td>
                <Td>{product?.attributes?.title}</Td>
                <Td>{product?.attributes?.category?.data.attributes?.title}</Td>
                <Td>
                  <Image
                    borderRadius={"full"}
                    objectFit={"cover"}
                    boxSize={"40px"}
                    src={product?.attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url}
                    alt={product?.attributes?.title}
                  />
                </Td>
                <Td isNumeric>${product.attributes.price}</Td>
                <Td isNumeric>${product.attributes.stock}</Td>
                <Td>
                  <Button
                    as={Link}
                    to={`/products/${product.id}`}
                    colorScheme="purple"
                    variant={"solid"}
                    mr={3}
                    onClick={(a) => a}
                  >
                    <IoEyeOutline size={17} />
                  </Button>
                  <Button
                    colorScheme="red"
                    variant={"solid"}
                    mr={3}
                    onClick={() => {
                      setClickedProductId(product.id);
                      onOpen();
                    }}
                  >
                    <FaTrashAlt size={17} />
                  </Button>
                  <Button
                    colorScheme="red"
                    variant={"solid"}
                    mr={3}
                    onClick={() => {
                      setClickedProductId(product.id)
                      setProductToEdite(product.attributes);
                      isOnOpenModal();
                    }}
                  >
                    <MdOutlineEditNote />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Caregory</Th>
              <Th>Thubnail</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      <CustemAlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        isLoading={isDestroying}
        title={"Are You Sure"}
        describtion={
          "Do you really want to destroy this product ? This product cannot be undone"
        }
        onOkHandelr={() => destoryProduct(clickedProductId)}
      />
      <CustomModal
        isOpen={isOpenModal}
        onOpen={isOnOpenModal}
        onClose={isOnClose}
        title={"Update Product"}
        onOkClick={onSubmitHandler}
        isLoading={isUpdating}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Product Title"
            name="title"
            value={productToEdite?.title}
            onChange={onChangeHandeler}
          />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Product TiDescriptiontle"
            name="description"
            value={productToEdite?.description}
            onChange={onChangeHandeler}
          />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Price</FormLabel>

          <NumberInput
            name="price"
            defaultValue={productToEdite?.price}
            onChange={{ onChangePriceHandeler }}
            precision={2}
            step={0.2}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Count in Stock</FormLabel>

          <NumberInput
            precision={2}
            step={0.2}
            name="stock"
            defaultValue={productToEdite?.stock}
            onChange={{ onChangeStockHandeler }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={3}>
          <FormControl>
            <FormLabel>Thumbnail</FormLabel>
            <Input
              id="thumbnail"
              type="file"
              h={"full"}
              p={2}
              accept="image/png, image/gif, image/jpeg"
              onChange={onChangeThumbnailHandler}
            />
          </FormControl>
        </FormControl>
      </CustomModal>
    </>
  );
};

export default ProductsTable;
