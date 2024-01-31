import { FC } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Box, Button, Divider, Flex, Heading, HStack, Icon, Stack, Text, useToast } from "@chakra-ui/react"
import { AiOutlineClockCircle } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { CiViewList } from "react-icons/ci"
import { FiEdit2 } from "react-icons/fi"
import { HiOutlineStatusOnline } from "react-icons/hi"
import { SiGoogleanalytics } from "react-icons/si"
import { VscOpenPreview } from "react-icons/vsc"
import { InstructorCoursesCardProps } from "./instructor-courses-card.props"
import { loadImage } from "@/helpers/image.helper"
import { useTranslation } from "react-i18next"
import { useActions } from "@/hooks/useActions"

const InstructorEditCourseCard: FC<InstructorCoursesCardProps> = ({ item }): JSX.Element => {
	const router = useRouter()
	const { t } = useTranslation()
	const { deleteCourse } = useActions()
	const toast = useToast()

	const onDelete = () => {
		const isAgree = confirm('Are you sure?')
		if(isAgree) {
			deleteCourse({courseId: item._id, callback: () => {
				toast({
					title: 'Successfully deleted',
					description: item.title,
					position: 'top-right',
					isClosable: true
				})
				router.replace(router.asPath)
			}})
		}
	}

	return (
		<HStack p={5} boxShadow='dark-lg' mt={5} borderRadius='lg'>
			<Stack spacing={5}>
				<Box pos='relative' w='full' h='300px'>
					<Image fill src={loadImage(item.previewImage)} style={{objectFit: 'cover', borderRadius: '10px'}} alt={item.title} />
				</Box>
				<Text fontSize='20px' color='facebook.500' fontWeight='bold'>
					{t(item.level, {ns: 'courses'})}
				</Text>
				<Heading>{item.title}</Heading>
				<HStack>
					<Flex align='center' gap={1}>
						<Icon as={CiViewList} />
						<Text>{item.lessonCount} lesson</Text>
					</Flex>
					<Flex align='center' gap={1}>
						<Icon as={AiOutlineClockCircle} />
						<Text>{item.totalHour} hours</Text>
					</Flex>
					<Flex align='center' gap={1}>
						<Icon as={SiGoogleanalytics} />
						<Text>{t(item.level, {ns: 'courses'})}</Text>
					</Flex>
				</HStack>
				<Divider />
				<HStack>
					<Button rightIcon={<VscOpenPreview />}>Preview</Button>
					<Button rightIcon={<FiEdit2 />} onClick={() => router.push(`/instructor/edit-courses/${item.slug}`)}>
						Edit
					</Button>
					<Button rightIcon={<BsTrash />} onClick={onDelete}>Delete</Button>
					<Button rightIcon={<HiOutlineStatusOnline />}>Status</Button>
				</HStack>
			</Stack>
		</HStack>
	)
}

export default InstructorEditCourseCard