import {
  Card,
  CardBody,
  Center,
  Spinner,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useState } from 'react';
import Account from './account';
import Settings from './settings';
import Transactions from './transactions';
import MyCourses from './my-courses';
import SavedCards from './saved-cards';
import DangerZone from './danger-zone';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { TransactionsType } from '@/interfaces/user.interface';
import { CourseType } from '@/interfaces/course.interface';
import { AuthService } from '@/services/auth.service';
import { CardType } from '@/interfaces/constants.interface';

const DashboardPageComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionsType[]>([]);
  const [myCourses, setMyCourses] = useState<CourseType[]>([]);
  const [savedCards, setSavedCards] = useState<CardType[]>([]);

  const { user } = useTypedSelector(state => state.user);

  const tabHandler = async (idx: number) => {
    setIsLoading(true);
    setTabIndex(idx);
    try {
      if (idx == 2 && !transactions.length) {
        const res = await AuthService.getTransactions();
        setTransactions(res);
      } else if (idx == 3 && !myCourses.length) {
        const res = await AuthService.getMyCourses();
        setMyCourses(res);
      } else if (idx == 4 && !savedCards.length) {
        const response = await AuthService.getSavedCards();
        setSavedCards(response);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card mt={24}>
        <CardBody>
          <Tabs
            isFitted
            variant="enclosed-colored"
            colorScheme="facebook"
            orientation="vertical"
            onChange={tabHandler}
            defaultValue={tabIndex}
          >
            <TabList mb="1em" h="300">
              <Tab>Account</Tab>
              <Tab>Settings</Tab>
              <Tab>Transactions</Tab>
              <Tab>My Courses</Tab>
              <Tab>Saved Cards</Tab>
              <Tab>Danger Zone</Tab>
            </TabList>
            <TabPanels px={5}>
              {isLoading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <>
                  {tabIndex === 0 && user && <Account />}
                  {tabIndex === 1 && <Settings />}
                  {tabIndex === 2 && (
                    <Transactions transactions={transactions} />
                  )}
                  {tabIndex === 3 && <MyCourses myCourses={myCourses} />}
                  {tabIndex === 4 && <SavedCards savedCards={savedCards} />}
                  {tabIndex === 5 && <DangerZone />}
                </>
              )}
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
};

export default DashboardPageComponent;
