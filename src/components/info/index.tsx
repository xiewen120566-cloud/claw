import { Locale } from "@/i18n/routing";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

export default async function Info({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Info" });

  const generateText = () => {
    const {hostname} = new URL(process.env.BASE_URL);
    return `${hostname}`
  }

  return (
    <Box py={{ base: 3, md: 5, lg: 7 }}>
      <Card
        bg="transparent"
        size={{ base: "sm", md: "md", lg: "lg" }}
        shadow="none"
      >
        <CardBody pt={0}>
          <VStack fontSize="xs" gap={1} alignItems="stretch">
            <Heading size="sm" pb={1}>
              {t.rich("section1.title", {
                hostname: process.env.BASE_URL,
                tagname: (text) => (
                  <Link
                    fontSize="xs"
                    href={text as string}
                    color="blue.500"
                    mr={1}
                  >
                    {generateText()}
                  </Link>
                ),
              })}
            </Heading>
            <Text>{t("section1.paragraph1")}</Text>
            <Text>{t("section1.paragraph2")}</Text>
            <Text>{t("section1.paragraph3")}</Text>
            <Text>{t("section1.paragraph4")}</Text>
            <Text>{t("section1.paragraph5")}</Text>
          </VStack>
        </CardBody>
      </Card>
      <Card
        bg="transparent"
        size={{ base: "sm", md: "md", lg: "lg" }}
        shadow="none"
      >
        <CardBody pt={0}>
          <VStack fontSize="xs" gap={1} alignItems="stretch">
            <Heading size="sm" pb={1}>
              {t.rich("section2.title", {
                hostname: process.env.BASE_URL,
                tagname: (text) => (
                  <Link
                    fontSize="xs"
                    href={text as string}
                    color="blue.500"
                    mr={1}
                  >
                    {generateText()}
                  </Link>
                ),
              })}
            </Heading>
            <Text>
              {t.rich("section2.paragraph1", {
                hostname: process.env.BASE_URL,
                tagname: (text) => (
                  <Link
                    fontSize="xs"
                    href={text as string}
                    color="blue.500"
                    mr={1}
                  >
                    {generateText()}
                  </Link>
                ),
              })}
            </Text>
            <Text>{t("section2.paragraph2")}</Text>
            <Text>{t("section2.paragraph3")}</Text>
            <Text>{t("section2.paragraph4")}</Text>
            <Text>{t("section2.paragraph5")}</Text>
            <Text>{t("section2.paragraph6")}</Text>
            <Text>{t("section2.paragraph7")}</Text>
            <Text>{t("section2.paragraph8")}</Text>
            <Text>{t("section2.paragraph9")}</Text>
            <Text>{t("section2.paragraph10")}</Text>
            <Text>{t("section2.paragraph11")}</Text>
            <Text>{t("section2.paragraph12")}</Text>
          </VStack>
        </CardBody>
      </Card>
      <Card
        bg="transparent"
        size={{ base: "sm", md: "md", lg: "lg" }}
        shadow="none"
      >
        <CardBody pt={0}>
          <VStack fontSize="xs" gap={1} alignItems="stretch">
            <Heading size="sm" pb={1}>
              {t.rich("section3.title", {
                hostname: process.env.BASE_URL,
                tagname: (text) => (
                  <Link
                    fontSize="xs"
                    href={text as string}
                    color="blue.500"
                    mr={1}
                  >
                    {generateText()}
                  </Link>
                ),
              })}
            </Heading>
            <Text>
              {t.rich("section3.paragraph1", {
                hostname: process.env.BASE_URL,
                tagname: (text) => (
                  <Link
                    fontSize="xs"
                    href={text as string}
                    color="blue.500"
                    mr={1}
                  >
                    {generateText()}
                  </Link>
                ),
              })}
            </Text>
            <Text>
              {t.rich("section3.paragraph2", {
                hostname: process.env.BASE_URL,
                tagname: (text) => (
                  <Link
                    fontSize="xs"
                    href={text as string}
                    color="blue.500"
                    mr={1}
                  >
                    {generateText()}
                  </Link>
                ),
              })}
            </Text>
            <Text>{t("section3.paragraph3")}</Text>
            <Text>{t("section3.paragraph4")}</Text>
            <Text>
              {t.rich("section3.paragraph5", {
                hostname: process.env.BASE_URL,
                tagname: (text) => (
                  <Link
                    fontSize="xs"
                    href={text as string}
                    color="blue.500"
                    mr={1}
                  >
                    {generateText()}
                  </Link>
                ),
              })}
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
