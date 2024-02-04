import SectionTitle from "@/components/section-title/section-title"
import { LaunchCourseIcon } from "@/icons"
import { Box, Card, CardBody, Flex, HStack } from "@chakra-ui/react"

const CoursesPageComponent = () => {
  return <>
    <Card mt={10}>
      <CardBody>
        <HStack>
          <Box w='30%'>
            <SectionTitle title='Instructors' subtitle='Managing instructors on platform' />
          </Box>
          <Flex w='70%' justify='flex-end'>
            <LaunchCourseIcon />
          </Flex>
        </HStack>
      </CardBody>
    </Card>
  </>
}

export default CoursesPageComponent