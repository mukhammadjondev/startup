import { withLayout } from "@/layout/layout"
import { SuccessPageComponent } from "@/page-component"
import { GetServerSideProps } from "next"

const SuccessPage = () => {
  return <SuccessPageComponent />
}

export default withLayout(SuccessPage)

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	if (!query.payment_intent && !query.payment_intent_client_secret && !query.redirect_status) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {},
	}
}