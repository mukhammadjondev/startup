import { AdminInstructorTable } from "@/components"
import SectionTitle from "@/components/section-title/section-title"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { RecordVideoIcon } from "@/icons"
import { Box, Card, CardBody, Flex, HStack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

const InstructorsPageComponent = () => {
  const { instructors } = useTypedSelector(state => state.admin)

  return <>
    <Card mt={10}>
      <CardBody>
        <HStack>
          <Box w='30%'>
            <SectionTitle title='Instructors' subtitle='Managing instructors on platform' />
          </Box>
          <Flex w='70%' justify='flex-end'>
            <RecordVideoIcon />
          </Flex>
        </HStack>
      </CardBody>
    </Card>
    <Box mt={10} mx='auto'>
      <Tabs isFitted variant='solid-rounded' colorScheme='facebook'>
        <TabList mb='1em'>
          <Tab>Approved instructors</Tab>
          <Tab>Applied instructors</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AdminInstructorTable instructors={instructors.filter(c => c.approved)} approved={true} />
          </TabPanel>
          <TabPanel>
            <AdminInstructorTable instructors={instructors.filter(c => !c.approved)} approved={false} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </>
}

export default InstructorsPageComponent