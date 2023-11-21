"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, userLogin } from "../app/features/loginSlice";
import { Navigate } from "react-router-dom";

export default function Login({ isAuthenticated }) {
 
  const { loading, data, error } = useSelector(selectLogin);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const onChangeHandeler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handelerOnSubmit = (e) => {
    e.preventDefault();
    if (!user.identifier && !user.password) {
      setIsEmail(true);
      setIsPassword(true);
    }
    if (!user.identifier) {
      setIsEmail(true);
    }

    if (!user.password) {
      setIsPassword(true);
    }
    dispatch(userLogin(user));
    return;
  };
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          as={"form"}
          onSubmit={handelerOnSubmit}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="identifier">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                isInvalid={isEmail}
                errorBorderColor="crimson"
                value={user.identifier}
                name="identifier"
                onChange={onChangeHandeler}
              />
              {isEmail ? (
                <FormHelperText color={"red.500"}>
                  Email is Requared
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  isInvalid={isPassword}
                  errorBorderColor="crimson"
                  value={user.password}
                  name="password"
                  onChange={onChangeHandeler}
                />

                <InputRightElement h={"full"} w={"50px"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword ? (
                <FormHelperText color={"red.500"}>
                  Password is Requared
                </FormHelperText>
              ) : null}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
           
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                isLoading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
