import { Pricing } from '@/components';
import { ProductsType } from '@/interfaces/constants.interface';
import { Divider, Heading, Stack, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const PricingPageComponent = ({ products }: { products: ProductsType[] }) => {
  const { t } = useTranslation();

  return (
    <>
      <Stack spacing={4} py={10} width="100%" direction="column">
        <Stack
          p={5}
          alignItems="center"
          justifyContent={{ base: 'flex-start', md: 'space-around' }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack width={{ base: '100%', md: '40%' }} textAlign="center">
            <Heading size="lg">
              {t('pricing_title', { ns: 'global' })}{' '}
              <Text color="green.400">
                {t('pricing_title_green', { ns: 'global' })}
              </Text>
            </Heading>
          </Stack>
          <Stack width={{ base: '100%', md: '60%' }}>
            <Text textAlign="center">
              {t('pricing_description', { ns: 'global' })}
            </Text>
          </Stack>
        </Stack>
        {products.map(product => (
          <Fragment key={product.id}>
            <Divider />
            <Pricing product={product} />
          </Fragment>
        ))}
      </Stack>
    </>
  );
};

export default PricingPageComponent;
