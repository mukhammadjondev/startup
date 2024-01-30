import { GetServerSideProps } from "next"
import { withInstructorLayout } from "@/layout/instructor"

const InstructorPage = () => {
  return (
    <div>InstructorPage</div>
  )
}

export default withInstructorLayout(InstructorPage)

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/instructor/students',
      permanent: false,
    }
  }
}