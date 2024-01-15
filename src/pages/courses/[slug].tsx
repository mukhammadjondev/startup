import { withLayout } from "@/layout/layout"
import Seo from "@/layout/seo/seo";
import { DetailedCourseComponent } from "@/page-component"
import { useRouter } from "next/router";

const DetailedCoursePage = () => {
  const router = useRouter();

	return (
		<Seo metaTitle={`MuhsDev course | ${router.query.slug}`}>
			<DetailedCourseComponent />
		</Seo>
	)
}

export default withLayout(DetailedCoursePage)