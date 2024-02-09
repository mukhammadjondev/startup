import SectionTitle from "@/components/section-title/section-title"
import { booksCategory } from "@/config/constants"
import { Box, Button, Flex, Grid, HStack, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import { useState, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { AiFillShopping } from "react-icons/ai"
import { motion } from 'framer-motion'
import { useTypedSelector } from "@/hooks/useTypedSelector"
import Image from "next/image"
import { loadImage } from "@/helpers/image.helper"
import { BooksType } from "@/interfaces/books.interface"
import { useActions } from "@/hooks/useActions"

const BooksPageComponent = () => {
  const [filter, setFilter] = useState<string>('all-categories')
	const { books } = useTypedSelector(state => state.books)
  const cart = useTypedSelector(state => state.cart)
  const { addBookToCart } = useActions()

  const backgroundColor = useColorModeValue('gray.200', 'gray.900')
  const {t} = useTranslation()
  const toast = useToast()

  const filteredData = useCallback(() => {
    switch (filter) {
			case 'programming':
				return books.filter(c => c.category === 'programming');
			case 'design':
				return books.filter(c => c.category === 'design');
			case 'business':
				return books.filter(c => c.category == 'business');
			case 'history':
				return books.filter(c => c.category == 'history');
			case 'writing':
				return books.filter(c => c.category == 'writing');
			case 'lifestyle':
				return books.filter(c => c.category == 'lifestyle');
			default:
				return books;
		}
  }, [filter, books])

  const addToCart = (book: BooksType) => {
    const existingProduct = cart.books.find(c => c._id === book._id)
    if(existingProduct) {
      toast({title: 'Book already exist in cart', position: 'bottom', status: 'warning'})
      return
    }
    addBookToCart(book)
    toast({title: 'Book added successfully', position: 'bottom'})
  }

  return <>
    <SectionTitle title={t('title', {ns: 'books'})} subtitle={t('description', {ns: 'books'})} textAlign='center' pt={4} />
    <Flex justify='center' mt={5} flexWrap='wrap'>
      {booksCategory.map((item, idx) => (
        <Button key={item.id} colorScheme='facebook' variant={filter === item.id ? 'solid' : 'outline'} borderRadius={0} borderLeftRadius={idx === 0 ? 'md' : 0} borderRightRadius={booksCategory.length - 1 === idx ? 'md' : 0} onClick={() => setFilter(item.id)}>
          {t(item.label, {ns: 'books'})}
        </Button>
      ))}
    </Flex>

    <Grid gridTemplateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}} rowGap={20} gap={4} mt={5} mb={20}>
      {filteredData().map(item => (
        <motion.div  key={item._id} layout>
          <Box pos='relative'>
						<Box pos='relative' w='full' h='250px'>
            	<Image src={loadImage(item.image)} alt={item.title} fill style={{borderRadius: '10px', objectFit: 'cover'}} />
						</Box>
            <HStack pos='absolute' minH='90px' borderRadius='lg' boxShadow='dark-lg' bg={backgroundColor} left={2} right={2} bottom={-10} p={2} justify='space-between'>
              <Box>
                <Text fontSize='md'>{item.title}</Text>
                <Text fontWeight='bold' fontSize='2xl'>
                  {item.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                </Text>
              </Box>
              <Button colorScheme='facebook' rightIcon={<AiFillShopping />} onClick={() => addToCart(item)} isDisabled={cart.books.map(c => c._id).includes(item._id) ? true : false}>
                {t('filter_card_btn', {ns: 'books'})}
              </Button>
            </HStack>
          </Box>
        </motion.div>
      ))}
    </Grid>
  </>
}

export default BooksPageComponent