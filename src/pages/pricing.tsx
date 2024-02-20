import { ProductsType } from '@/interfaces/constants.interface';
import { withLayout } from '@/layout/layout';
import Seo from '@/layout/seo/seo';
import { PricingPageComponent } from '@/page-component';
import { PaymentService } from '@/services/payment.service';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';

const PricingPage = ({ products }) => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={
        `MuhsDev | ${t('pricing_page_title', { ns: 'seo' })}` ||
        'MuhsDev | Pricing Package'
      }
      metaDescription={
        `MuhsDev | ${t('pricing_page_description', { ns: 'seo' })}` ||
        'The best package for using and doing lesson on MuhsDev academy'
      }
    >
      <PricingPageComponent products={products} />
    </Seo>
  );
};

export default withLayout(PricingPage);

export const getServerSideProps: GetServerSideProps<
  PricingPageType
> = async () => {
  const products = await PaymentService.productList();

  return {
    props: { products },
  };
};

interface PricingPageType extends Record<string, unknown> {
  products: ProductsType[];
}
