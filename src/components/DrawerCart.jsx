import { useDispatch, useSelector } from "react-redux";
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { isCloseCartDrawerAction, selectGlobal } from "../app/features/globalSlice";

const DrawerCart = () => {
    const btnRef = React.useRef()

    const dispatch = useDispatch()
    const {isOpenCartDrawer} = useSelector(selectGlobal)

    const onClose = () => {
        dispatch(isCloseCartDrawerAction())
    }
   
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
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" colorScheme="red" mr={3} onClick={onClose}>
              Clear All
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerCart;
