import { Box,  Skeleton, SkeletonText } from "@chakra-ui/react";

const DeatilesSekelton = () => {
  return (
    <div>
      <Box padding="5"  bg="gray.700" rounded={""}>
        <Skeleton height={"200px"} />
        <SkeletonText mt="4" mx={"auto"} noOfLines={1} spacing="4"  maxW={"200px"} />
        <SkeletonText mt="4" noOfLines={3} spacing="4" />
        <SkeletonText mt="4" mx={"auto"} noOfLines={1} spacing="4"  maxW={"120px"} />
        <SkeletonText mt="4" height={"50px"} rounded={"lg"} spacing="4"  maxW={"120px"} />
      </Box>
    </div>
  );
};

export default DeatilesSekelton;
