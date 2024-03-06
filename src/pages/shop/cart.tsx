import { withLayout } from '@/layout/layout';
import Seo from '@/layout/seo/seo';
import { CartPageComponent } from '@/page-component';
import { NextPage } from 'next';

const CartPage: NextPage = () => {
  return (
    <Seo metaTitle="MuhsDev | Shopping cart">
      <CartPageComponent />
    </Seo>
  );
};

export default withLayout(CartPage);
