 

import { getCategories, getGames } from "@/actions";
import { Locale } from "@/i18n/routing";
import {
  Card,
  Container,
  SimpleGrid,
  CardBody,
  VStack,
  Heading,
  Flex,
  Box,
} from "@chakra-ui/react";

interface Props {
  params: {
    locale: Locale;
    slug: string;
  };
  searchParams: Record<string, string>;
}

import Header from "@/components/header";
import Footer from "@/components/footer";
import { splitGames } from "@/utils";
import GameList from "@/components/game-list";
import Info from "@/components/info";
import { notFound } from "next/navigation";
import { CATEGORY_BG_MAP, CATEGORY_HEADING_COLOR_MAP } from "@/configs";
import { getTranslations } from "next-intl/server";
import GameItem from "@/components/game-item";
import { randomGames } from "@/utils";


export default async function Page({
  params: { locale, slug },
  searchParams,
}: Props) {
  const { hostname } = new URL(process.env.BASE_URL);
  const categories = await getCategories(locale);
  const allGames = await getGames(locale);
  const t = await getTranslations({ locale, namespace: "Common" });
  const category = categories.find((item) => item.alias === slug);

  if (!category) {
    return notFound();
  }

  const _list = allGames.filter(
    (item) => item.categoryId === category.id 
  );
  const categoryByGames = randomGames(_list.length, 50).map((item) => _list[item]);

  return (
    <>
      <style>
        {`
  body {
    background-color: ${CATEGORY_BG_MAP[slug]}
  }
  `}
      </style>
      <Header categories={categories} hostname={hostname} />
      <Container
        as="main"
        maxWidth="container.xl"
        px={{ base: 3, md: 5, lg: 6 }}
        py={{ base: 4, md: 6 }}
      >
        <VStack alignItems="stretch" gap={5}>
          <Card
            as="section"
            bg="whiteAlpha.900"
            shadow="sm"
            rounded="xl"
            overflow="hidden"
            border="1px solid"
            borderColor="whiteAlpha.500"
            backdropFilter="blur(10px)"
            size={{ base: "sm", md: "md", lg: "lg" }}
          >
            <CardBody>
              <Flex as="header" pt={6} alignItems="center" gap={3}>
                {/* <Image
                  alt={t("Games", { category: category.name })}
                  src={`/static/images/category/${category.alias}.png`}
                  width="48"
                  height="48"
                  priority={false}
                /> */}
                <Box w="10px" h="10px" borderRadius="full" bg="blue.500" />
                <Heading
                  as="h1"
                  fontSize={{ base: "md", md: "xl" }}
                  color={CATEGORY_HEADING_COLOR_MAP[category.alias]}
                  textTransform="uppercase"
                >
                  {t("Games", { category: category.name })}
                </Heading>
              </Flex>
              <SimpleGrid
                pt={{ base: 3, md: 4, lg: 6 }}
                columns={{ base: 1, md: 3 }}
                gap={{ base: 3, md: 4, lg: 6 }}
              >
                {splitGames(categoryByGames.slice(0, 18)).map(
                  (sliceGames, sliceIndex) => {
                    const spans = [0, 1, 3];
                    return (
                      <GameList
                        key={sliceIndex}
                        data={sliceGames}
                        locale={locale}
                        channel={searchParams?.channel}
                        spanIndex={spans[sliceIndex]}
                      />
                    );
                  }
                )}
              </SimpleGrid>
              <SimpleGrid
                pt={{ base: 3, md: 4, lg: 6 }}
                gap={{ base: 3, md: 4, lg: 6 }}
                columns={{ base: 3, md: 9 }}
              >
                {categoryByGames.slice(14).map((item,index) => (
                  <GameItem
                    key={index}
                    data={item}
                    locale={locale}
                    channel={searchParams?.channel}
                  />
                ))}
              </SimpleGrid>
            </CardBody>
          </Card>
          <Info locale={locale} />
        </VStack>
      </Container>
      <Footer />
    </>
  );
}
