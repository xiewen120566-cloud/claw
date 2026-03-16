import { Locale } from '@/i18n/routing';
import { Games } from '@/services/data';
import { Grid, GridItem } from '@chakra-ui/react';

import GameItem from '../game-item';

interface Props {
  data: Games;
  spanIndex: number;
  locale: Locale;
  channel?: string;
}

export default function GameList({ data, locale, channel, spanIndex }: Props) {
  const shouldUseTwoBigFourSmall = (data?.length ?? 0) === 6;
  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns={
        shouldUseTwoBigFourSmall
          ? { base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }
          : { base: "repeat(3, 1fr)", md: "repeat(3, 1fr)" }
      }
      gap={{ base: 2, md: 3, lg: 4 }}
    >
      {data?.map((game, index) => {
        const colSpan = shouldUseTwoBigFourSmall
          ? index < 2
            ? { base: 2, md: 2 }
            : 1
          : index === spanIndex
            ? 1
            : 1;
        const ratio = shouldUseTwoBigFourSmall && index < 2 ? 2 : 1;
        return (
          <GridItem key={index} rowSpan={1} colSpan={colSpan}>
            <GameItem data={game} locale={locale} channel={channel} ratio={ratio} />
          </GridItem>
        );
      })}
    </Grid>
  );
}
