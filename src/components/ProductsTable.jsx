import {
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
} from "../app/services/apislice";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEditNote } from "react-icons/md";
import CustemAlertDialog from "../shared/AlertDialog";
import { useEffect, useState } from "react";
import CustomModal from "../shared/CustomModal";

const ProductsTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: isOnOpenModal,
    onClose: isOnClose,
  } = useDisclosure();

  const [clickedProductId, setClickedProductId] = useState(null);
  const { isLoading, data, error } = useGetDashProductsQuery({ page: 1 });

  const [destoryProduct, { isLoading: isDestroying, isSuccess }] =
    useDelteDashProducrMutation();

  useEffect(() => {
    if (isSuccess) {
      setClickedProductId(null);
      onClose();
    }
  }, [isSuccess]);
  console.log(data);
  if (isLoading) return <TableSkelaton />;
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
                    src={`${import.meta.env.VITE_SERVER_URL}${
                      product?.attributes?.thumbnail?.data?.attributes?.formats
                        ?.thumbnail?.url
                    }`}
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
                    onClick={isOnOpenModal}
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
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input placeholder="Product Title" />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Price</FormLabel>

          <NumberInput precision={2} step={0.2}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Count in Stock</FormLabel>

          <NumberInput precision={2} step={0.2}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </CustomModal>
    </>
  );
};

export default ProductsTable;
