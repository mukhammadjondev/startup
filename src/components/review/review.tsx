import { Avatar, Box, Button, Center, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import { uz, enUS, ru, tr } from "date-fns/locale"
import { formatDistance } from "date-fns"
import { useTranslation } from "react-i18next"
import ReactStars from "react-stars"
import Cookies from "js-cookie"

const Review = () => {
  const { t } = useTranslation()

  const getLocalLanguage = () => {
		const lng = Cookies.get('i18next')
    switch(lng) {
      case 'en':
        return enUS
      case 'tr':
        return tr
      case 'ru':
        return ru
      case 'uz':
        return uz
    }
	}

  return <>
    <Heading mt={10}>{t('review', {ns: 'courses'})}</Heading>
    {data.map((item, idx) => (
      <Flex key={idx} gap={4} mt={6} borderBottomWidth='1px' pb={2}>
        <Avatar bg={useColorModeValue('gray.200', 'gray.600')} display={{base: 'none', md: 'block'}} size='md' />
        <Box>
          <Flex align='center' gap={2} mt={1}>
            <Text fontWeight='bold'>{item.name}</Text>
            <Text>
              {formatDistance(new Date('20:12:2023'), new Date(), {locale: getLocalLanguage()})}{' '}
              {t('ago', {ns: 'courses'})}
            </Text>
          </Flex>
          <ReactStars edit={false} value={Number(item.rating)} />
          <Text mt={2}>{item.summary}</Text>
        </Box>
      </Flex>
    ))}
    <Center mt={5}>
      {data.length >= 5 && (
        <Button size='sm' colorScheme='facebook' variant='outline' fontWeight='bold'>
          {t('more', {ns: 'courses'})}
        </Button>
      )}
    </Center>
  </>
}

export default Review

const data = [
	{
		name: 'Aziz Rohimov',
		rating: '5',
		summary: 'raxmat',
	},
	{
		name: 'Axmadjon Mustafayev',
		rating: '5',
		summary: 'kurs ajoyib raxmat',
	},

	{
		name: 'Nurillo Mahmudjonov ',
		rating: '5',
		summary: "aka katta raxmat ancha narsa o'rgandim",
	},
	{
		name: "Aziz faxriddin o'g'li",
		rating: '5',
		summary: 'raxmat',
	},
	{
		name: 'Samar Badriddinov',
		rating: '5',
		summary: 'cool',
	},
]