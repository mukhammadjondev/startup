import { useRouter } from "next/router"
import { InstructorManageCourse } from "@/components"
import { SubmitValuesInterface } from "@/components/instructor-manage-course/instructor-manage-course.props"
import SectionTitle from "@/components/section-title/section-title"
import { Divider } from "@chakra-ui/react"

const EditDetailedCoursePageComponent = () => {
  const router = useRouter()

	const onSubmit = (data: SubmitValuesInterface) => {
    console.log(data)
  }

  return <>
    <SectionTitle title={`Edit course ${router.query.slug}`} subtitle='' />
    <Divider mt={5} />
    <InstructorManageCourse titleBtn="Edit course" submitHandler={onSubmit} />
  </>
}

export default EditDetailedCoursePageComponent