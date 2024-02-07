import SectionTitle from "@/components/section-title/section-title";
import { PlanCurriculumIcon } from "@/icons";
import { CgAdd } from "react-icons/cg";
import { Box, Button, Card, CardBody, Flex, Grid, HStack, IconButton, Image, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BooksModal } from "@/components";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { loadImage } from "@/helpers/image.helper";
import { useActions } from "@/hooks/useActions";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { BooksType } from "@/interfaces/books.interface";

const BooksPageComponent = () => {
	const [booksValue, setBooksValue] = useState<BooksType | null>(null)
  const priceBackgroundColor = useColorModeValue('gray.200', 'gray.900')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { books } = useTypedSelector(state => state.books)
	const { deleteBooks } = useActions()
	const { t } = useTranslation()
	const toast = useToast()

	const deleteBooksHandler = (id: string) => {
		const isAgree = confirm(t('are_you_sure', {ns: 'global'}))
		if(isAgree) {
			deleteBooks({bookId: id, callback: () => {
				toast({title: t('successfully_deleted', {ns: 'instructor'}), position: 'top-right', isClosable: true})
			}})
		}
	}

	const editOpenModal = (book: BooksType) => {
		setBooksValue(book)
		onOpen()
	}

	const createOpenModal = () => {
		setBooksValue(null)
		onOpen()
	}

	return <>
    <Card mt={10}>
      <CardBody>
        <HStack>
          <Box w='30%'>
            <SectionTitle title={t('books_section_title', {ns: 'admin'})} subtitle={t('books_section_descr', {ns: 'admin'})} />
          </Box>
          <Flex w='70%' justify='flex-end'>
            <PlanCurriculumIcon />
          </Flex>
        </HStack>
      </CardBody>
    </Card>

    <Flex mt={5} justify='flex-end'>
      <IconButton colorScheme='facebook' aria-label='Search database' icon={<CgAdd />} onClick={createOpenModal} />
    </Flex>

    <Grid gridTemplateColumns={{base: 'repeat(100%)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}} gap={4} rowGap={20} mt={5} mb={20}>
      {books.map(item => (
        <Box key={item._id} pos='relative'>
          <Image src={loadImage(item.image)} alt={item.title} borderRadius='lg' w='full' h='250px' objectFit='cover' />

          <Flex pos='absolute' left={2} right={2} borderRadius='lg' boxShadow='dark-lg' bottom='-10' minH='90px' p={2} bg={priceBackgroundColor} flexDir='column'>
            <Box>
              <Text fontSize='lg'>{item.title}</Text>
              <Text fontSize='2xl'>
                {item.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
              </Text>
            </Box>
            <HStack>
              <Button w='full' rightIcon={<FaTrash />} onClick={() => deleteBooksHandler(item._id as string)} colorScheme='red'>
								{t('delete_course', {ns: 'instructor'})}
              </Button>
              <Button w='full' rightIcon={<FaEdit />} onClick={() => editOpenModal(item)} colorScheme='green'>
								{t('edit_course', {ns: 'instructor'})}
              </Button>
            </HStack>
          </Flex>
        </Box>
      ))}
    </Grid>

		<BooksModal isOpen={isOpen} onClose={onClose} booksValue={booksValue} />
  </>
}

export default BooksPageComponent