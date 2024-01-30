import { Box, Button, Divider, Flex, Heading, HStack, Icon, Stack, Text } from "@chakra-ui/react"
import Image from "next/image"
import { FC } from "react"
import { AiOutlineClockCircle } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { CiViewList } from "react-icons/ci"
import { FiEdit2 } from "react-icons/fi"
import { SiGoogleanalytics } from "react-icons/si"
import { VscOpenPreview } from "react-icons/vsc"
import { HiOutlineStatusOnline } from "react-icons/hi"
import { InstructorCoursesCardProps } from "./instructor-courses-card.props"
import { useTranslation } from "react-i18next"

const InstructorCoursesCard: FC<InstructorCoursesCardProps> = ({item}): JSX.Element => {
  const { t } = useTranslation()

  return (
    <HStack p={5} boxShadow='dark-lg' mt={5} borderRadius='lg'>
      <Stack spacing={5} w='70%'>
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
					<Button rightIcon={<FiEdit2 />}>Edit</Button>
					<Button rightIcon={<BsTrash />}>Delete</Button>
					<Button rightIcon={<HiOutlineStatusOnline />}>Status</Button>
        </HStack>
      </Stack>
      <Box w='30%' h='300px' pos='relative'>
				<Image fill src={item.image} alt={item.title} style={{objectFit: 'cover', borderRadius: '10px'}} />
			</Box>
    </HStack>
  )
}

export default InstructorCoursesCard