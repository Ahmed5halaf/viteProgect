import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import {
  isCloseCartDrawerAction,
  selectGlobal,
} from "../app/features/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { clearCart, selectCart } from "../app/features/cartSlice";

const DrawerCart = () => {
  const btnRef = useRef();

  const dispatch = useDispatch();
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const { cartProducts } = useSelector(selectCart);

  const onClose = () => {
    dispatch(isCloseCartDrawerAction());
  };

  return (
    <div>
      <Drawer
        isOpen={isOpenCartDrawer}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader> your Shopping Cart</DrawerHeader>

          <DrawerBody>
            {cartProducts.length ? (
              cartProducts.map((item) => (
                <CartDrawerItem key={item.id} {...item} />
              ))
            ) : (
              <Text>Your Cart is Empty</Text>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme="red"
              mr={3}
              onClick={() => dispatch(clearCart())}
            >
              Clear All
            </Button>
        
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerCart;
