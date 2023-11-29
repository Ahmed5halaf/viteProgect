import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../app/features/cartSlice";

const CartDrawerItem = ({
  id,
  attributes: { thumbnail, title, price },
  quantity,
}) => {
  const dispatch = useDispatch();
  return (
    <div>
      <>
        <Flex alignItems={"center"} mb={3} py={2}>
          <Image
            src={`${import.meta.env.VITE_SERVER_URL}${
              thumbnail?.data?.attributes?.url
            }`}
            alt={title}
            w={"80px"}
            h={"80px"}
            rounded={"full"}
            objectFit={"cover"}
            mr={5}
          />
          <Stack>
            <Text fontSize={"sm"}>{title}</Text>
            <Text fontSize={"sm"}>Price: ${price}</Text>
            <Text fontSize={"sm"}>Quantity: {quantity}</Text>
            <Button
              variant={"solid"}
              colorScheme="red"
              size={"xs"}
              w={"fit-content"}
              onClick={() => dispatch(removeFromCart(id))}
            >
              Remove
            </Button>
          </Stack>
        </Flex>
        <Divider />
      </>
    </div>
  );
};

export default CartDrawerItem;
