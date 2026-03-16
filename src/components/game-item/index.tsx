import { Locale } from "@/i18n/routing";
import { GameRecord } from "@/services/data";
import { getTargetHref } from "@/utils";
import { AspectRatio, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";
import Image from "next/image";

const GameItem = ({
  data,
  locale,
  channel,
  ratio = 1,
}: {
  data: GameRecord;
  locale: Locale;
  channel?: string;
  ratio?: number;
}) => {
  if(!data){
    return null;
  }
  return (
    <LinkBox
      rounded={{ base: "md", md: "lg", lg: "xl" }}
      overflow="hidden"
      position="relative"
      bg="white"
      border="1px solid"
      borderColor="blackAlpha.100"
      boxShadow="sm"
      transition="transform 0.15s ease, box-shadow 0.15s ease"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "md"
      }}
    >
      <AspectRatio ratio={ratio}>
        <Image alt={data?.name} width={200} height={200} src={data?.image} priority={false} />
      </AspectRatio>
      <LinkOverlay
        href={getTargetHref(locale, `/detail/${data.id}`, channel)}
      >
        <Heading
          width="full"
          noOfLines={1}
          px={2}
          py={1}
          as="h5"
          lineHeight={1.5}
          size="xs"
          fontSize="xs"
          position="absolute"
          left={0}
          bottom={0}
          zIndex={2}
          background="linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.72) 100%)"
          color="white"
        >
          {data.name}
        </Heading>
      </LinkOverlay>
    </LinkBox>
  );
};

export default GameItem
