import { loadImage } from "@/helpers/image.helper"
import { Avatar, Box, Divider, Flex, Heading, HStack, Icon, Stack, Text } from "@chakra-ui/react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { AiOutlineClockCircle } from "react-icons/ai"
import { CiViewList } from "react-icons/ci"
import { SiGoogleanalytics } from "react-icons/si"
import ReactStars from "react-stars"
import { PopularCoursesCardProps } from "./popular-courses-card.props"

const PopularCoursesCard = ({course}: PopularCoursesCardProps) => {
  const { t } = useTranslation()

  return (
    <Stack spacing={3} p={3} cursor='pointer'>
      <Box pos='relative' w='full' h='210px'>
        <Image src={loadImage(course.previewImage)} alt={course.title} fill style={{objectFit: 'cover', borderRadius: '10px'}} />
      </Box>
      <HStack>
        <Text color='#e59819'>5</Text>
        <ReactStars edit={false} value={5} color2='#e59819'></ReactStars>
        <Text opacity='.8'>(3)</Text>
      </HStack>
      <Heading fontSize='xl'>{course.title}</Heading>
      <HStack>
        <Flex align='center' gap={1}>
          <Icon as={CiViewList} />
          <Text>{course.lessonCount} {t('lesson', {ns: 'courses'})}</Text>
        </Flex>
        <Flex align='center' gap={1}>
          <Icon as={AiOutlineClockCircle} />
          <Text>10 {t('hour', {ns: 'courses'})}</Text>
        </Flex>
        <Flex align='center' gap={1}>
          <Icon as={SiGoogleanalytics} />
          <Text>{t(course.level, {ns: 'courses'})}</Text>
        </Flex>
      </HStack>
      <Divider />
      <Flex justify='space-between' align='center'>
        <HStack align='center'>
          <Avatar src={course.author.avatar} name={course.author.fullName} />
					<Text>{course.author.fullName}</Text>
        </HStack>
        <Text>{course.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</Text>
      </Flex>
    </Stack>
  )
}

export default PopularCoursesCard