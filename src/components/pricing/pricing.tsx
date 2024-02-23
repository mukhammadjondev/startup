import {
  Button,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle } from 'react-icons/fa';
import { PricingProps } from './pricing.props';
import { useRouter } from 'next/router';
import { useActions } from '@/hooks/useActions';

const Pricing = ({ product, checked }: PricingProps) => {
  const { t } = useTranslation();
  const { addProductToCart } = useActions();
  const router = useRouter();

  const colorTextLight = checked ? 'white' : 'facebook.600';
  const bgColorLight = checked ? 'facebook.400' : 'gray.300';

  const colorTextDark = checked ? 'white' : 'facebook.500';
  const bgColorDark = checked ? 'facebook.400' : 'gray.300';

  const addProductToCartHandler = () => {
    addProductToCart(product);
    router.push('/shop/checkout');
  };

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{ base: 'flex-start', md: 'space-around' }}
      direction={{ base: 'column', md: 'row' }}
      alignItems={{ md: 'center' }}
    >
      <Heading size="md">{product.name}</Heading>
      <List spacing={3} textAlign="start">
        {product.description.split(', ').map((item, idx) => (
          <ListItem key={idx}>
            <ListIcon as={FaCheckCircle} color="green.500" />
            {item}
          </ListItem>
        ))}
      </List>
      <Heading size="xl">
        {(product.default_price.unit_amount / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </Heading>
      <Stack>
        <Button
          size="md"
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}
          onClick={addProductToCartHandler}
        >
          {t('pricing_btn', { ns: 'global' })}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Pricing;
