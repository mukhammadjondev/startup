import { AdminCourseCard, ErrorAlert } from "@/components"
import SectionTitle from "@/components/section-title/section-title"
import { useActions } from "@/hooks/useActions"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { LaunchCourseIcon } from "@/icons"
import { Box, Card, CardBody, Flex, Grid, HStack } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

const CoursesPageComponent = () => {
  const { courses, error } = useTypedSelector(state => state.admin)
	const { clearAdminError } = useActions()
  const { t } = useTranslation()

  return <>
    <Card mt={10}>
      <CardBody>
        <HStack>
          <Box w='30%'>
            <SectionTitle title={t('courses_section_title', {ns: 'admin'})} subtitle={t('courses_section_descr', {ns: 'admin'})} />
          </Box>
          <Flex w='70%' justify='flex-end'>
            <LaunchCourseIcon />
          </Flex>
        </HStack>
      </CardBody>
    </Card>
    <>{error && <ErrorAlert title={error as string} clearHandler={clearAdminError} />}</>
    <Grid gridTemplateColumns='repeat(3, 1fr)' gap={4} mb={10}>
      {courses.map(course => (
        <AdminCourseCard key={course._id} course={course} />
      ))}
    </Grid>
  </>
}

export default CoursesPageComponent