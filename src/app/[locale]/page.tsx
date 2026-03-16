 

import { getCategories, getGames } from "@/actions";
import { Locale } from "@/i18n/routing";
import {
  Card,
  Container,
  SimpleGrid,
  CardBody,
  Flex,
  CardHeader,
  VStack,
  Heading,
  Box,
  Image
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
const ElTemplate = dynamic(() => import("@/components/el-temlplate"), { ssr: false })
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getTargetHref, randomGames, splitGames } from "@/utils";
import Info from "@/components/info";
import { getTranslations } from "next-intl/server";
import GameList from "@/components/game-list";
import { FaChevronRight } from "react-icons/fa6";
import { CATEGORY_BG_MAP, CATEGORY_HEADING_COLOR_MAP, CATEGORY_SECONDAY_COLOR_MAP } from "@/configs";
import Carousel from "@/components/carousel";
interface Props {
  params: {
    locale: Locale;
  };
  searchParams: Record<string, string>;
}

const CarouselItem = ({ imageUrl, title, description, href }: { 
  imageUrl: string; 
  title: string; 
  description: string; 
  href: string;
}) => {
  return (
    <Box 
      as="a" 
      href={href}
      position="relative" 
      width="100%"
      height="100%"
      overflow="hidden"
      borderRadius="5px"
      display="block"
    >
      <Image
        src={imageUrl}
        alt={title}
        objectFit="cover"
        width="100%"
        height="100%"
      />
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        bg="linear-gradient(transparent, rgba(0, 0, 0, 0.8))"
        color="white"
        p={4}
        textAlign="center"
      >
        <Heading size="md" mb={2} noOfLines={1}>{title}</Heading>
        <Box fontSize="sm" noOfLines={2}>{description}</Box>
      </Box>
    </Box>
  );
};

const SectionTitle = ({ children }: { children: string }) => {
  return (
    <Flex alignItems="center" gap={3}>
      <Box w="10px" h="10px" borderRadius="full" bg="blue.500" />
      <Heading as="h2" fontSize={{ base: "md", md: "lg" }} fontWeight="700">
        {children}
      </Heading>
      <Box flex={1} h="1px" bg="blackAlpha.200" />
    </Flex>
  );
};

export default async function Page({
  params: { locale },
  searchParams,
}: Props) {
  const { hostname } = new URL(process.env.BASE_URL);
  const allGames = await getGames(locale);
  const categories = await getCategories(locale);
  const t = await getTranslations({ locale, namespace: "Common" });

  const newGames = randomGames(allGames.length, 6).map((item) => allGames[item]);
  const topGames = randomGames(allGames.length, 12).map((item) => allGames[item]);
  return (
    <>
      <Header hostname={hostname} categories={categories} />
      <Container
        as="main"
        maxWidth="container.xl"
        px={{ base: 3, md: 5, lg: 6 }}
        py={{ base: 4, md: 6 }}
      >
        <Box
          as="section"
          gridRowStart={"span 3"}
          gridRowEnd={"span 3"}
          bg={"#fff"}
          borderRadius="xl"
          overflow="hidden"
          border="1px solid"
          borderColor="blackAlpha.100"
          boxShadow="sm"
          mb={4}
        >
          <Carousel>
            {
              topGames.map((item, index) => {
                return (
                  <CarouselItem
                    key={item.id}
                    imageUrl={item.image}
                    title={item.name}
                    description={item.description}
                    href={getTargetHref(
                      locale,
                      `/detail/${item?.id}`
                    )}
                  />
                )
              })
            }
          </Carousel>
        </Box>

        <Box as="section">
          <ElTemplate 
          id="gwawog-Home-Banner"
          className="adsbygoogle"
          data-ad-client="ca-pub-4082162765175328"
          data-ad-slot="7139756162"
          data-ad-format="auto"
          data-full-width-responsive="true"
          style={{ display: "block" }}
          />
        </Box>

        <VStack as="section" alignItems="stretch" gap={{ base: 4, md: 5, lg: 6 }}>
          <Card
            as="section"
            shadow="sm"
            rounded="xl"
            overflow="hidden"
            border="1px solid"
            borderColor="blackAlpha.100"
            bg="white"
            size={{ base: "sm", md: "md", lg: "lg" }}
          >
            <CardHeader>
              <SectionTitle>{t("Games", { category: t("New") })}</SectionTitle>
            </CardHeader>
            <CardBody pt={0}>
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap={{ base: 3, md: 4, lg: 6 }}
              >
                {splitGames(newGames, 3).map((sliceGames, sliceIndex) => {
                  const spans = [0, 3, 1];
                  return (
                    <GameList
                      key={sliceIndex}
                      data={sliceGames}
                      locale={locale}
                      channel={searchParams?.channel}
                      spanIndex={spans[sliceIndex]}
                    />
                  );
                })}
              </SimpleGrid>
            </CardBody>
          </Card>
          <Card
            as="section"
            shadow="sm"
            rounded="xl"
            overflow="hidden"
            border="1px solid"
            borderColor="blackAlpha.100"
            bg="white"
            size={{ base: "sm", md: "md", lg: "lg" }}
          >
            <CardHeader>
              <SectionTitle>{t("Games", { category: t("Top") })}</SectionTitle>
            </CardHeader>
            <CardBody pt={0}>
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap={{ base: 3, md: 4, lg: 6 }}
              >
                {splitGames(topGames, 3).map((sliceGames, sliceIndex) => {
                  const spans = [0, 3, 1];
                  return (
                    <GameList
                      key={sliceIndex}
                      data={sliceGames}
                      locale={locale}
                      channel={searchParams?.channel}
                      spanIndex={spans[sliceIndex]}
                    />
                  );
                })}
              </SimpleGrid>
            </CardBody>
          </Card>
          {categories.map((category, categoryIndex) => {
            const games = allGames.filter(
              (game) => game.categoryId === category.id
            );
            const gamesList = randomGames(games.length, 25).map((item) => games[item]);
            if (!gamesList.length) {
              return null
            }

            return (
              <Card
                as="section"
                key={category.alias}
                shadow="sm"
                rounded="xl"
                overflow="hidden"
                border="1px solid"
                borderColor="blackAlpha.100"
                bg={CATEGORY_BG_MAP[category.alias]}
                size={{ base: "sm", md: "md", lg: "lg" }}
              >
                <CardHeader>
                  <Flex justifyContent="space-between">
                    <Heading
                      as="h2"
                      fontSize={{ base: "md", md: "lg" }}
                      color={CATEGORY_HEADING_COLOR_MAP[category.alias]}
                      textTransform="uppercase"
                      flex="1"
                    >
                      {t("Games", { category:  category.name})}
                    </Heading>
                    <Flex
                      alignItems="center"
                      as="a"
                      href={getTargetHref(
                        locale,
                        `/category/${category.alias}`,
                        searchParams?.channel
                      )}
                      alignSelf="flex-end"
                      color={CATEGORY_SECONDAY_COLOR_MAP[category.alias]}
                      fontWeight="bold"
                      fontSize="xs"
                      opacity={.75}
                      marginLeft={5}
                    >
                      {t("More")}
                      <FaChevronRight size="10px" />
                    </Flex>
                  </Flex>
                </CardHeader>
                <CardBody pt={0}>
                  <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    gap={{ base: 3, md: 4, lg: 6 }}
                  >
                    {splitGames(gamesList.slice(0, 18)).map((sliceGames, sliceIndex) => {
                      let spans = [0, 1, 3];
                      if (categoryIndex % 2) {
                        spans = [1, 3, 4];
                      }
                      return (
                        <GameList
                          key={sliceIndex}
                          data={sliceGames}
                          locale={locale}
                          channel={searchParams?.channel}
                          spanIndex={spans[sliceIndex]}
                        />
                      );
                    })}
                  </SimpleGrid>
                </CardBody>
              </Card>
            );
          })}
          <Info locale={locale} />
        </VStack>
      </Container>
      <Footer />
    </>
  );
}
