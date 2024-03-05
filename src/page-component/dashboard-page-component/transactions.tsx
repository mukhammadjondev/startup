import { Divider, HStack, Stack, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { TransactionsProps } from './dashboard.props';
import { Fragment } from 'react';
import { getPriceFormatted } from '@/helpers/total-price.helper';

export default function Transactions({ transactions }: TransactionsProps) {
  return (
    <>
      {transactions.map(transaction => (
        <Fragment key={transaction.id}>
          <HStack justify="space-between" align="flex-start">
            <Stack>
              <Text
                fontWeight="bold"
                color="facebook.300"
                fontSize="xl"
                textTransform="capitalize"
              >
                {transaction.payment_method_details.card.brand} -{' '}
                {'**** **** **** '}
                {transaction.payment_method_details.card.last4}
              </Text>
              <Text>
                {format(new Date(transaction.created * 1000), 'dd MMMM, yyyy')}
              </Text>
            </Stack>
            <Text fontSize="2xl" fontWeight="bold">
              {getPriceFormatted(transaction.amount / 100)}
            </Text>
          </HStack>
          <Divider my={5} />
        </Fragment>
      ))}
    </>
  );
}
