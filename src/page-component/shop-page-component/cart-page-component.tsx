import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import SectionTitle from '@/components/section-title/section-title';
import { loadImage } from '@/helpers/image.helper';
import { getPriceFormatted, getTotalPrice } from '@/helpers/total-price.helper';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useRouter } from 'next/router';
import { useActions } from '@/hooks/useActions';
import { useTranslation } from 'react-i18next';
import $axios from '@/api/axios';
import { getPaymentUrl } from '@/config/api.config';
import { ErrorAlert } from '@/components';

const CartPageComponent = () => {
  const [active, setActive] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cart = useTypedSelector(state => state.cart);
  const router = useRouter();
  const { editCourseToCart } = useActions();

  const getSubtitle = () => {
    let textCourse: string = '';
    let textBooks: string = '';
    const courses = cart.courses;
    const books = cart.books;

    textCourse = courses.length ? `${courses.length} Courses in cart` : '';
    textBooks = books.length ? `${books.length} Books in cart` : '';
    const isAnd = courses.length ? true : false;

    return `${textCourse} ${isAnd ? 'and' : ''} ${textBooks}`;
  };

  const applyCouponHandler = async () => {
    if (active) return;

    try {
      setIsLoading(true);
      const { data } = await $axios.get(
        `${getPaymentUrl('apply-coupon')}/${coupon}`
      );
      if (data.valid) {
        setActive(true);
        const newArr = cart.courses.map(item => ({
          ...item,
          price: item.price - (data.percent_off / 100) * item.price,
        }));
        editCourseToCart(newArr);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Coupon is not valid');
    }
  };

  return (
    <>
      <SectionTitle title="Shopping cart" subtitle={getSubtitle()} />
      <Grid
        gridTemplateColumns={{ base: '1fr', md: '70% 30%' }}
        gap={5}
        mr={10}
      >
        <GridItem>
          <Divider my={5} />
          {cart.books.map(book => (
            <Fragment key={book._id}>
              <ShoppingCartCard item={book} image={book.image} />
              <Divider my={5} />
            </Fragment>
          ))}
          {cart.courses.map(course => (
            <Fragment key={course._id}>
              <ShoppingCartCard item={course} image={course.previewImage} />
              <Divider my={5} />
            </Fragment>
          ))}
        </GridItem>
        <GridItem>
          <Stack
            mt={5}
            border={'1px'}
            borderRadius={'md'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            p={5}
          >
            <Text fontWeight="bold" fontSize="xl" opacity=".7">
              Total:
            </Text>
            <Heading>
              {getTotalPrice(cart.courses, cart.books).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Heading>
            <Button
              h={14}
              colorScheme="facebook"
              borderRadius={0}
              onClick={() => router.push('/shop/checkout')}
            >
              Checkout
            </Button>
            <Divider />
            {error && (
              <ErrorAlert title={error} clearHandler={() => setError('')} />
            )}
            {active && (
              <Alert status="success">
                <AlertIcon />
                Coupon was successfully applied
              </Alert>
            )}
            <Text fontWeight="bold" fontSize="lg">
              Promotions
            </Text>
            <Box pos="relative" mt={5}>
              <Input
                w="full"
                bg="white"
                color="gray.900"
                placeholder="Enter coupon"
                _placeholder={{ color: 'gray.500' }}
                borderRadius={0}
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
              />
              <Button
                pos="absolute"
                right={0}
                top={0}
                colorScheme="facebook"
                zIndex={999}
                borderRadius={0}
                isLoading={isLoading}
                onClick={applyCouponHandler}
              >
                Apply
              </Button>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
};

export default CartPageComponent;

const ShoppingCartCard = ({ item, image }) => {
  const { removeBookFromCart, removeCourseFromCart } = useActions();
  const { t } = useTranslation();

  const removeCartItem = () => {
    if (item.previewImage) {
      removeCourseFromCart(item._id);
    } else {
      removeBookFromCart(item._id);
    }
  };

  return (
    <Flex
      justify={{ base: 'flex-start', md: 'space-between' }}
      direction={{ base: 'column', md: 'row' }}
    >
      <HStack>
        <Box pos="relative" w="200px" h="100px">
          <Image
            fill
            src={loadImage(image)}
            alt={item.title}
            style={{ objectFit: 'cover', borderRadius: '10px' }}
          />
        </Box>
        <Stack>
          <Heading fontSize="xl">{item.title}</Heading>
          <Text>by Admin Platform</Text>
          <HStack>
            <Tag colorScheme="facebook">
              {item.previewImage ? 'Courses' : 'Books'}
            </Tag>
            <Tag colorScheme="facebook">Usefull</Tag>
            <Tag colorScheme="facebook" textTransform="capitalize">
              {item.previewImage
                ? t(item.category, { ns: 'courses' })
                : item.category}
            </Tag>
          </HStack>
        </Stack>
      </HStack>
      <Stack spacing={0} mt={{ base: 5, md: 0 }}>
        <Text color="facebook.300" fontSize="2xl" fontWeight="bold">
          {getPriceFormatted(item.price)}
        </Text>
        <IconButton
          aria-label="remove"
          icon={<BsFillTrashFill />}
          colorScheme="red"
          h={14}
          onClick={removeCartItem}
        />
      </Stack>
    </Flex>
  );
};
