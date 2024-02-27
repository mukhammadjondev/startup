import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { CourseDashboardProps } from './courses-page-component.props';
import LessonItem from './lesson-item';

const Sidebar: FC<CourseDashboardProps> = ({ ...props }) => {
  const [moduleIndex, setModuleIndex] = useState<number>(0);

  const { sections, pendingSection } = useTypedSelector(state => state.section);
  const { course } = useTypedSelector(state => state.course);
  const { getSection } = useActions();

  useEffect(() => {
    if (course) {
      getSection({ courseId: course?._id, callback: () => {} });
    }
  }, [course]);

  useEffect(() => {
    const lessonId = localStorage.getItem(course?._id as string);

    const currentModuleId = sections.find(item =>
      item.lessons.map(c => c._id).includes(lessonId as string)
    )?._id;

    const findIndex = sections
      .map(c => c._id)
      .indexOf(currentModuleId as string);

    setModuleIndex(findIndex === -1 ? 0 : findIndex);
  }, [sections]);

  return (
    <Box
      position="fixed"
      top="12vh"
      bottom="4vh"
      w="400px"
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderRadius="lg"
      boxShadow="xl"
      p={5}
      zIndex={9}
      transition="all .5s"
      overflowY="scroll"
      css={{
        '&::-webkit-scrollbar': { width: '1px' },
        '&::-webkit-scrollbar-track': { width: '1px' },
        '&::-webkit-scrollbar-thumb': { background: 'transparent' },
      }}
      {...props}
    >
      {pendingSection ? (
        <Center alignItems="center" h="full">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.600"
            color="facebook.200"
            size="xl"
          />
        </Center>
      ) : (
        <>
          <Heading fontSize="2xl">Kurs bo'limlari</Heading>
          <Flex align="center" gap={2} mt={3}>
            {sections.length} ta Bo'lim <Icon as={GoDotFill} />
            {''}
            {sections
              .map(c => c.lessons.length)
              .reduce((a, b) => +a + +b, 0)}{' '}
            ta Darslik
          </Flex>

          <Accordion mb={5} mr={2} index={moduleIndex}>
            {sections.map((section, idx) => (
              <AccordionItem borderRadius="8px" mt={5} key={section._id}>
                <AccordionButton
                  height="60px"
                  bg={useColorModeValue('gray.100', 'gray.700')}
                  borderRadius="md"
                  fontWeight="bold"
                  _hover={{}}
                  onClick={() => setModuleIndex(idx)}
                >
                  <Box flex="1" textAlign="left">
                    <AccordionIcon />
                    {section.title}
                  </Box>
                </AccordionButton>
                <AccordionPanel px={0} pb={4}>
                  {section.lessons.map(lesson => (
                    <LessonItem lesson={lesson} key={lesson._id} />
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
