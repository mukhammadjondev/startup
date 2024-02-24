import StatsCard from '@/components/stats-card/status-card';
import {
  getBalanceObject,
  getPriceFormatted,
} from '@/helpers/total-price.helper';
import { BalanceType } from '@/interfaces/instructor.interface';
import { PaymentService } from '@/services/payment.service';
import {
  SimpleGrid,
  chakra,
  Card,
  CardBody,
  HStack,
  Heading,
  Icon,
  Divider,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import {
  MdAccountBalance,
  MdOutlineAccountBalanceWallet,
} from 'react-icons/md';
import { SiFuturelearn } from 'react-icons/si';

const RevenuePageComponent = ({ balance }: { balance: BalanceType }) => {
  const { t } = useTranslation();

  const openAccountLink = async () => {
    const data = await PaymentService.instructorAccountLink();
    window.open(data);
  };

  return (
    <>
      <chakra.h1 textAlign="center" fontSize="4xl" py={10} fontWeight="bold">
        {t('revenue_title', { ns: 'instructor' })}
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={t('earn', { ns: 'instructor' })}
          stat={getPriceFormatted(5000)}
          icon={<AiOutlineDollarCircle size="3em" />}
        />
        <StatsCard
          title={t('payouts', { ns: 'instructor' })}
          stat={getPriceFormatted(getBalanceObject(balance).payouts)}
          icon={<SiFuturelearn size="3em" />}
        />
        <StatsCard
          title={t('balance', { ns: 'instructor' })}
          stat={getPriceFormatted(500)}
          icon={<MdOutlineAccountBalanceWallet size="3em" />}
        />
      </SimpleGrid>
      <Card mt={20}>
        <CardBody>
          <HStack justify="space-between">
            <Heading fontFamily="mono" letterSpacing={5}>
              {t('revenue_report', { ns: 'instructor' })}
            </Heading>
            <Icon as={MdAccountBalance} fontSize={60} />
          </HStack>
          <Text>{t('revenue_report_description', { ns: 'instructor' })}</Text>
          <Divider my={5} />
          <HStack justify="space-between">
            <Heading fontFamily="mono" letterSpacing={5}>
              {t('pending_balance', { ns: 'instructor' })}
            </Heading>
            <Text fontSize={40}>
              {getPriceFormatted(getBalanceObject(balance).payouts)}
            </Text>
          </HStack>
          <Text>{t('pending_balance_description', { ns: 'instructor' })}</Text>
          <Divider my={5} />
          <HStack justify="space-between">
            <Heading fontFamily="mono" letterSpacing={5}>
              {t('payouts', { ns: 'instructor' })}
            </Heading>
            <Icon
              as={FiSettings}
              fontSize={60}
              color="facebook.400"
              cursor="pointer"
              onClick={openAccountLink}
            />
          </HStack>
          <Text>{t('payouts_description', { ns: 'instructor' })}</Text>
        </CardBody>
      </Card>
    </>
  );
};

export default RevenuePageComponent;
