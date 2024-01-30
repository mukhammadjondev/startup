import { InstructorManageCourse } from "@/components"
import { SubmitValuesInterface } from "@/components/instructor-manage-course/instructor-manage-course.props"
import SectionTitle from "@/components/section-title/section-title"
import { Divider } from "@chakra-ui/react"

const CreateCourseComponent = () => {
  const onSubmit = (data: SubmitValuesInterface) => {
    console.log(data)
  }

  return <>
    <SectionTitle title='Create course' subtitle='Note that when you are creating course it will be draf' />
    <Divider mt={5} />
    <InstructorManageCourse titleBtn="Create course" submitHandler={onSubmit} />
  </>
}

export default CreateCourseComponent