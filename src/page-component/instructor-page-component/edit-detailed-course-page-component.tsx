import { useRouter } from "next/router"
import { InstructorManageCourse } from "@/components"
import SectionTitle from "@/components/section-title/section-title"
import { Divider, useToast } from "@chakra-ui/react"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useActions } from "@/hooks/useActions"
import { CourseType } from "@/interfaces/course.interface"

const EditDetailedCoursePageComponent = () => {
  const router = useRouter()
  const { course } = useTypedSelector(state => state.instructor)
  const { editCourse } = useActions()
  const toast = useToast()

	const onSubmit = (data: CourseType) => {
    editCourse({...data, callback: () => {
      toast({title: 'Successfully edited', position: 'top-right', isClosable: true})
      router.push('/instructor/edit-courses')
    }})
  }

  return <>
    <SectionTitle title={`Edit course ${router.query.slug}`} subtitle='' />
    <Divider mt={5} />
    <InstructorManageCourse titleBtn="Edit course" submitHandler={onSubmit} courseValues={course} />
  </>
}

export default EditDetailedCoursePageComponent