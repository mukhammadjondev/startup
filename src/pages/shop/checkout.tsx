import { API_URL } from "@/config/api.config";
import { CardType } from "@/interfaces/constants.interface";
import { withLayout } from "@/layout/layout";
import { CheckoutPageComponent } from "@/page-component";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";

const CheckoutPage: NextPage<CheckoutPageProps> = ({ cards }) => {
  return <CheckoutPageComponent cards={cards} />;
};

export default withLayout(CheckoutPage);

export const getServerSideProps: GetServerSideProps<
  CheckoutPageProps
> = async ({ req }) => {
  const { data } = await axios.get(`${API_URL}/customer/saved-cards`, {
    headers: { Authorization: `Bearer ${req.cookies.refresh}` },
  });

  return {
    props: {
      cards: data,
    },
  };
};

interface CheckoutPageProps extends Record<string, unknown> {
  cards: CardType[];
}
