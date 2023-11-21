import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const CardTest = ({ product }) => {
  const { colorMode } = useColorMode();
console.log(product);
  return (
    <Card border={"1px solid #a8b5c8"} bg={"none"}>
      <CardBody>
        <Image
          src={`${product.thumbnail}`}
          alt="Green double couch with wooden legs"
          borderRadius="50%"
          width="200px"
          height="200px"
          mx="auto"
          objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign="center" mb={2}>
            ddd{" "}
          </Heading>
          <Text fontSize={"sm"} textAlign={"center"}>
            ssss
          </Text>
          <Text color="purpul.600" fontSize="3xl" textAlign={"center"}>
fff          </Text>
          <Button
            as={Link}
            to={`/products/1`}
            bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
            size={"xl"}
            variant={"outline"}
            border={"none"}
            py={5}
            overflow={"hidden"}
            w={"full"}
            _hover={{
              bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
              color: colorMode === "light" ? "white" : "#9f7aea",
              border: "transparent",
            }}
            mt={6}
          >
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardTest;
