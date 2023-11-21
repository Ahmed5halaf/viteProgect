"use client";

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  Link,
} from "@chakra-ui/react";
import { LiaSun } from "react-icons/lia";
import { Link as RouterLink } from "react-router-dom";

import { BsMoon } from "react-icons/bs";
import Login from "./Login";
import CookieServies from "../../services/CookieServies";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../app/features/cartSlice";
import { onOpenCartDrawerAction } from "../app/features/globalSlice";

const Links = ["Dashboard", "Products", "Team"];

const NavLink = ({ children }) => {
  return (
    <Link
      as={RouterLink}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      to={children.toLowerCase()}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const { cartProducts } = useSelector(selectCart);
  const { colorMode, toggleColorMode } = useColorMode();
  const token = CookieServies.get("jwt");
  const loginHandeler = () => {
    CookieServies.remove("jwt");
    window.location.reload();
  };
  const dispatch = useDispatch();
  const onOpen = () => {
    dispatch(onOpenCartDrawerAction());
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} w={"full"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <RouterLink to="/">My App</RouterLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <BsMoon /> : <LiaSun />}
              </Button>
              <Button onClick={onOpen}>Cart({cartProducts.length})</Button>
              {token ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>

                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={loginHandeler}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <NavLink as RouterLink to={"/login"}>
                  Login
                </NavLink>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
