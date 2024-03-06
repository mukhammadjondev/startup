import { Box, Grid, Text } from '@chakra-ui/react';
import { SavedCardsProps } from './dashboard.props';

export default function SavedCards({ savedCards }: SavedCardsProps) {
  return (
    <Grid gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={5}>
      {savedCards.map(card => (
        <Box border="1px" p={5} borderRadius="lg" key={card.id}>
          <Text>
            {card.billing_details.name} |{' '}
            <Box as="span" fontWeight="bold" textTransform="capitalize">
              {card.card.brand} {card.card.last4}
            </Box>
          </Text>
          <Text>
            EXP: {card.card.exp_month}/{card.card.exp_year}
          </Text>
        </Box>
      ))}
    </Grid>
  );
}
