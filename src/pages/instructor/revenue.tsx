import { BalanceType } from '@/interfaces/instructor.interface';
import { withInstructorLayout } from '@/layout/instructor';
import { InstructorRevenuePageComponent } from '@/page-component';
import { PaymentService } from '@/services/payment.service';
import { GetServerSideProps, NextPage } from 'next';

const Revenue: NextPage<RevenuePageType> = ({ balance }) => {
  return <InstructorRevenuePageComponent balance={balance} />;
};

export default withInstructorLayout(Revenue);

export const getServerSideProps: GetServerSideProps<RevenuePageType> = async ({
  req,
}) => {
  const balance = await PaymentService.getInstructorBalance(
    req.cookies.refresh
  );

  return {
    props: { balance },
  };
};

interface RevenuePageType {
  balance: BalanceType;
}
