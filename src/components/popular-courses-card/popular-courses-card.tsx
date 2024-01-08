import { Divider, Flex, Heading, HStack, Icon, Image, Stack, Text } from "@chakra-ui/react"
import { AiOutlineClockCircle } from "react-icons/ai"
import { CiViewList } from "react-icons/ci"
import { SiGoogleanalytics } from "react-icons/si"
import ReactStars from "react-stars"
import { PopularCoursesCardProps } from "./popular-courses-card.props"

const PopularCoursesCard = ({course}: PopularCoursesCardProps) => {
  return (
    <Stack spacing={3} p={3} cursor='pointer'>
      <Image src={course.image} alt={course.title} objectFit='cover' w='full' h='210px' borderRadius='lg' />
      <HStack>
        <Text color='#e59819'>{course.reviewAvarage.toFixed(1)}</Text>
        <ReactStars edit={false} value={course.reviewAvarage} color2='#e59819'></ReactStars>
        <Text opacity='.8'>({course.reviewCount})</Text>
      </HStack>
      <Heading fontSize='xl'>{course.title}</Heading>
      <HStack>
        <Flex align='center' gap={1}>
          <Icon as={CiViewList} />
          <Text>{course.lessonCount} lesson</Text>
        </Flex>
        <Flex align='center' gap={1}>
          <Icon as={AiOutlineClockCircle} />
          <Text>{course.totalHour} hour</Text>
        </Flex>
        <Flex align='center' gap={1}>
          <Icon as={SiGoogleanalytics} />
          <Text>{course.level}</Text>
        </Flex>
      </HStack>
      <Divider />
      <Flex justify='space-between' align='center'>
        <HStack align='center'>
          <Image src={course.author.avatar} alt={course.author.firstName} w={50} h={50} borderRadius='full' />
          <Text>{course.author.firstName} {course.author.lastName[0]}.</Text>
        </HStack>
        <Text>{course.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</Text>
      </Flex>
    </Stack>
  )
}

export default PopularCoursesCard