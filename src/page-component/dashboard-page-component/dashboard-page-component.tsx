import {
  Card,
  CardBody,
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

const DashboardPageComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabHandler = async (idx: number) => {
    setTabIndex(idx);
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
              {tabIndex === 0 && <Account />}
              {tabIndex === 1 && <Settings />}
              {tabIndex === 2 && <Transactions />}
              {tabIndex === 3 && <MyCourses />}
              {tabIndex === 4 && <SavedCards />}
              {tabIndex === 5 && <DangerZone />}
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </>
  );
};

export default DashboardPageComponent;
