import dayjs from "dayjs";

import { Box, Container, Text, Image, Flex } from "@chakra-ui/react";

export default function Footer() {
  const url = new URL(process.env.BASE_URL);

  const hostname = url.hostname.at(0)?.toUpperCase() + url.hostname.slice(1);

  return (
    <Box as="footer" w="full" bg="white" borderTop="1px solid" borderColor="blackAlpha.100">
      <Container maxW="1200" p={{ base: 4, md: 5, lg: 6 }}>
        <Flex alignItems='center'>
          <Image src="/static/Group 116.png" h='2.5rem' ></Image>
          <Text textAlign="center" fontSize='xs' flex='1' color="gray.500">
            Copyright © {dayjs().format("YYYY")} | All rights reserved.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
