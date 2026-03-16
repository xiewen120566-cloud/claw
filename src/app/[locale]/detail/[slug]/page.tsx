 

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaCirclePlay } from "react-icons/fa6";
import { getCategories, getGames } from "@/actions";
import Footer from "@/components/footer";
import GameItem from "@/components/game-item";
import Header from "@/components/header";
import Info from "@/components/info";
import StarRating from "@/components/star-rating";
import { Locale } from "@/i18n/routing";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Tag,
  Text,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
const ElTemplate = dynamic(() => import("@/components/el-temlplate"), { ssr: false })
import { CATEGORY_BG_MAP } from "@/configs";
import { getTargetHref, randomGames} from "@/utils";
interface Props {
  params: {
    locale: Locale;
    slug: string;
  };
  searchParams: Record<string, string>;
}
const getLikes = () => {
  const min = 3;
  const max = 5;
  const number = Math.random() * (max - min) + min;
  return parseFloat(number.toFixed(1)); // 保留一位小数
};
export default async function Page({
  params: { locale, slug },
  searchParams,
}: Props) {
  const { hostname } = new URL(process.env.BASE_URL);
  const categories = await getCategories(locale);
  const allGames = await getGames(locale);
  const t = await getTranslations({ locale, namespace: "Common" });
  const game = allGames.find((item) => item.id.toString() === slug);
  if (!game) {
    return notFound();
  }

  const category = categories.find((item) => item.id === game.categoryId);

  const categoryByGames = allGames.filter(
    (item) => item.categoryId === category?.id && item.slug !== slug
  );
  const typeGames = randomGames(categoryByGames.length, 18).map((item) => categoryByGames[item]);

  if (!category) {
    return null;
  }
  return (
    <>
      <style>
        {`
      body {
        background: ${CATEGORY_BG_MAP[category.alias]}
      } 
`}
      </style>
      <Header hostname={hostname} categories={categories} />
      <Box as="main">
        <AspectRatio
          as="section"
          ratio={{ base: 16 / 9, md: 3 / 1 }}
          objectFit="contain"
          rounded="none"
          overflow="hidden"
        >
          <Image
            alt={game.name}
            width={200}
            height={200}
            src={game.image}
            priority={false}
          />
        </AspectRatio>
        <Box mb={8}>
          <Container maxWidth="container.xl" px={{ base: 3, md: 5, lg: 6 }} pt={{ base: 4, md: 6 }}>
            <Card
              as="section"
              shadow="sm"
              rounded="xl"
              overflow="hidden"
              border="1px solid"
              borderColor="whiteAlpha.500"
              size={{ base: "sm", md: "md", lg: "lg" }}
              bg="whiteAlpha.900"
              backdropFilter="blur(10px)"
            >
              <CardBody pt={{ base: 4, md: 5 }}>
                <Flex
                  as="header"
                  gap={4}
                  alignItems="center"
                  flexWrap={{ base: "wrap", sm: "nowrap" }}
                >
                  <Box w={{ base: "72px", sm: "88px" }} flex="0 0 auto">
                    <AspectRatio
                      w="full"
                      ratio={1}
                      objectFit="cover"
                      rounded="full"
                      border="3px solid"
                      borderColor="whiteAlpha.700"
                      overflow="hidden"
                      boxShadow="sm"
                    >
                      <Image
                        alt={game.name}
                        width={200}
                        height={200}
                        src={game.image}
                        priority={false}
                      />
                    </AspectRatio>
                  </Box>

                  <Box flex="1" minW={0}>
                    <Heading lineHeight={1.25} size="lg" as="h1" noOfLines={2}>
                      {game.name}
                    </Heading>
                    <StarRating
                        size="12px"
                        rating={getLikes()}
                        color="#ffaa25"
                      />
                    <Flex gap={2} py={2} alignItems="center">
                      <Box fontSize="2xs">BY</Box>
                      <Tag
                        fontSize="2xs"
                        size="sm"
                        rounded="sm"
                        colorScheme="cyan"
                      >
                        {category?.name}
                      </Tag>
                    </Flex>
                  </Box>
                </Flex>
                 <ElTemplate 
                  id="gwawog-Home-Banner"
                  className="adsbygoogle"
                  data-ad-client="ca-pub-4082162765175328"
                  data-ad-slot="3459531454"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                  style={{ display: "block" }}
                />
                <Flex justifyContent="center" py={3}>
                  <Button
                    colorScheme="cyan"
                    size="lg"
                    width="260px"
                    rounded="full"
                    as="a"
                    rel="noopener noreferrer"
                    href={getTargetHref(
                      locale,
                      `/play/${slug}`,
                      searchParams?.channel
                    )}
                    rightIcon={<FaCirclePlay />}
                  >
                    {t("Play")}
                  </Button>
                </Flex>
                <Heading as="h2" size="md" py={3}>
                  {t("Introduction")}
                </Heading>
                <Text>{game.description}</Text>
              </CardBody>
            </Card>
          </Container>
        </Box>
        <Container maxWidth="container.xl" px={{ base: 3, md: 5, lg: 6 }} pb={{ base: 4, md: 6 }}>
          <Card
            as="section"
            shadow="sm"
            rounded="xl"
            overflow="hidden"
            border="1px solid"
            borderColor="whiteAlpha.500"
            size={{ base: "sm", md: "md", lg: "lg" }}
            bg="whiteAlpha.900"
            backdropFilter="blur(10px)"
          >
            <CardBody pt={0}>
              <SimpleGrid
                gap={3}
                columns={{ base: 3, sm: 4, md: 6, lg: 8, xl: 12 }}
              >
                {typeGames.map((item) => {
                  return (
                    <GameItem
                      key={item?.id}
                      data={item}
                      locale={locale}
                      channel={searchParams?.channel}
                    />
                  );
                })}
              </SimpleGrid>
            </CardBody>
          </Card>
          <Info locale={locale} />
        </Container>
      </Box>
      <Footer />
    </>
  );
}
