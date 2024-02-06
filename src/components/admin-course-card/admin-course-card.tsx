import { loadImage } from "@/helpers/image.helper"
import { useActions } from "@/hooks/useActions"
import { Box, Button, ButtonGroup, Divider, Flex, Heading, Stack, Text, useToast } from "@chakra-ui/react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { BsTrash } from "react-icons/bs"
import { VscOpenPreview } from "react-icons/vsc"
import { AdminCourseCardProps } from "./admin-course-card.props"

const AdminCourseCard = ({course}: AdminCourseCardProps) => {
	const { t } = useTranslation()
	const { deleteAdminCourse } = useActions()
	const toast = useToast()

	const deleteAdminCourseHandler = () => {
		const isAgree = confirm(t('are_you_sure', {ns: 'global'}))
		if(isAgree) {
			deleteAdminCourse({courseId: course._id, callback: () => {
				toast({title: t('successfully_deleted', {ns: 'instructor'}), position: 'top-right', isClosable: true})
			}})
		}
	}

  return (
		<Box p={5} boxShadow='dark-lg' mt={5} borderRadius='lg'>
			<Stack spacing={2}>
				<Box pos='relative' w='100%' h='200px'>
					<Image fill src={loadImage(course.previewImage)} style={{ objectFit: 'cover', borderRadius: '10px' }} alt={course.title} />
				</Box>
				<Heading fontSize={'xl'}>{course.title}</Heading>
				<Divider />
				<Flex align='center' gap={2} fontSize='16px' color='facebook.200' fontWeight='bold'>
					Language: {course.language}
				</Flex>
				<Text fontWeight='bold' color='facebook.500'>
					Status:{' '}
					<Box as='span' color={course.isActive ? 'green.500' : 'red.500'}>
						{course.isActive ? 'Active' : 'Draft'}
					</Box>
				</Text>
				<ButtonGroup>
					<Button w='full' rightIcon={<VscOpenPreview />} colorScheme='facebook'>
						Preview
					</Button>
					<Button w='full' colorScheme='red' rightIcon={<BsTrash />} onClick={deleteAdminCourseHandler}>
						Delete
					</Button>
				</ButtonGroup>
			</Stack>
		</Box>
	)
}

export default AdminCourseCard