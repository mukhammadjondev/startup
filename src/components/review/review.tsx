import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { uz, enUS, ru, tr } from 'date-fns/locale';
import { formatDistance } from 'date-fns';
import { useTranslation } from 'react-i18next';
import ReactStars from 'react-stars';
import Cookies from 'js-cookie';
import { FC } from 'react';
import { ReviewProps } from './review.props';

const Review: FC<ReviewProps> = ({ reviews, isLoading }) => {
  const { t } = useTranslation();

  const getLocalLanguage = () => {
    const lng = Cookies.get('i18next');
    switch (lng) {
      case 'en':
        return enUS;
      case 'tr':
        return tr;
      case 'ru':
        return ru;
      case 'uz':
        return uz;
    }
  };

  return (
    <>
      <Heading mt={10}>{t('review', { ns: 'courses' })}</Heading>
      {isLoading ? (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <>
          {reviews.map(item => (
            <Flex key={item._id} gap={4} mt={6} borderBottomWidth="1px" pb={2}>
              <Avatar
                bg={useColorModeValue('gray.200', 'gray.600')}
                display={{ base: 'none', md: 'block' }}
                size="md"
                name={item.author.fullName}
                src={item.author.avatar}
              />
              <Box>
                <Flex align="center" gap={2} mt={1}>
                  <Text fontWeight="bold">{item.author.fullName}</Text>
                  <Text>
                    {formatDistance(new Date(item.updatedAt), new Date(), {
                      locale: getLocalLanguage(),
                    })}{' '}
                    {t('ago', { ns: 'courses' })}
                  </Text>
                </Flex>
                <ReactStars edit={false} value={Number(item.rating)} />
                <Text mt={2}>{item.summary}</Text>
              </Box>
            </Flex>
          ))}
        </>
      )}
      <Center mt={5}>
        {reviews.length >= 5 && (
          <Button
            size="sm"
            colorScheme="facebook"
            variant="outline"
            fontWeight="bold"
          >
            {t('more', { ns: 'courses' })}
          </Button>
        )}
      </Center>
    </>
  );
};

export default Review;
