import { loadImage } from "@/helpers/image.helper"
import { useActions } from "@/hooks/useActions"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { Box, Button, Divider, Heading, Stack, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import ErrorAlert from "../error-alert/error-alert"
import { DraftCourseCardProps } from "./draft-course-card.props"

const DraftCourseCard: FC<DraftCourseCardProps> = ({item}): JSX.Element => {
	const { activateCourse, draftCourse, clearCourseError } = useActions()
	const { isLoading, error } = useTypedSelector(state => state.course)

	const { t } = useTranslation()
	const toast = useToast()
	const router = useRouter()

	const activeHandler = () => {
		if(item.isActive) {
			draftCourse({courseId: item._id, callback: () => {
				toast({
					title: 'Successfully drafted your course',
					description: item.title,
					position: 'top-right',
					isClosable: true
				})
				router.replace(router.asPath)
			}})
		} else {
			activateCourse({courseId: item._id, callback: () => {
				toast({
					title: 'Successfully activated your course',
					description: item.title,
					position: 'top-right',
					isClosable: true
				})
				router.replace(router.asPath)
			}})
		}
	}

  return (
    <Box mt={5} p={5} border='1px' borderRadius='lg' borderColor={useColorModeValue('gray.200', 'gray.700')} boxShadow='dark-lg'>
			<>{error && <ErrorAlert title={error as string} clearHandler={clearCourseError} />}</>
			<Box pos='relative' w='100%' h='200px'>
				<Image src={loadImage(item.previewImage)} alt={item.title} fill style={{objectFit: 'cover', borderRadius: '10px'}}/>
			</Box>
			<Divider my={6} />
			<Stack spacing={5}>
				<Heading>{item.title}</Heading>
				<Text fontWeight='bold' color='facebook.500'>
					Status:{' '}
					<Box as='span' color={item.isActive ? 'green.500' : 'red.500'}>
						{item.isActive ? 'Activate' : 'Draft'}
					</Box>
				</Text>
				<Button colorScheme='facebook' h={14} variant='outline' onClick={activeHandler} isLoading={isLoading} loadingText={`${t('loading', {ns: 'global'})}`}>
					{!item.isActive ? 'Activate' : 'Draft'}
				</Button>
			</Stack>
		</Box>
  )
}

export default DraftCourseCard