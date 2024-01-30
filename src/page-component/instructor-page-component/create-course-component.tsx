import { InstructorManageCourse } from "@/components"
import { SubmitValuesInterface } from "@/components/instructor-manage-course/instructor-manage-course.props"
import SectionTitle from "@/components/section-title/section-title"
import { useActions } from "@/hooks/useActions"
import { Divider, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"

const CreateCourseComponent = () => {
  const { createCourse } = useActions()
  const toast = useToast()
  const router = useRouter()

  const onSubmit = (data: SubmitValuesInterface) => {
    createCourse({...data, callback: () => {
      toast({
        title: 'Successfully created',
        description: 'Yuo can customize your curriculm for your course',
        position: 'top-right',
        isClosable: true,
      })
      router.push('/instructor/courses')
    }})
  }

  return <>
    <SectionTitle title='Create course' subtitle='Note that when you are creating course it will be draf' />
    <Divider mt={5} />
    <InstructorManageCourse titleBtn="Create course" submitHandler={onSubmit} />
  </>
}

export default CreateCourseComponent