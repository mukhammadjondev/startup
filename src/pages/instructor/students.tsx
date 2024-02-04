import { withInstructorLayout } from "@/layout/instructor"
import { InstructorStudentsPageComponent } from "@/page-component"
import { AuthService } from "@/services/auth.service"
import { GetServerSideProps, NextPage } from "next"

const Students: NextPage = () => {
  return <InstructorStudentsPageComponent />
}

export default withInstructorLayout(Students)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const instructor = await AuthService.checkInstructor(req.cookies.refresh)

  if(!instructor) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

	return {
		props: {}
	}
}