import { getLessonTime } from '@/helpers/time.helper';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { LessonType } from '@/interfaces/instructor.interface';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { CourseDashboardProps } from './courses-page-component.props';

const Sidebar: FC<CourseDashboardProps> = ({ ...props }) => {
  const [moduleIndex, setModuleIndex] = useState<number>(0);

  const { sections, pendingSection } = useTypedSelector(state => state.section);
  const { course } = useTypedSelector(state => state.course);
  const { getSection } = useActions();

  useEffect(() => {
    getSection({ courseId: course?._id, callback: () => {} });
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
      display={{ base: 'none', lg: 'block' }}
      top="12vh"
      right="4vw"
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

const LessonItem = ({ lesson }: { lesson: LessonType }) => {
  const router = useRouter();
  const { user } = useTypedSelector(state => state.user);
  const { course } = useTypedSelector(state => state.course);
  const { getLesson } = useActions();

  const onLesson = () => {
    getLesson(lesson);
    localStorage.setItem(`${course?._id}`, lesson._id);
    const link = `/courses/dashboard/${course?.slug}`;
    router.replace(
      { pathname: link, query: { lesson: lesson._id } },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Box
      _hover={{
        background: useColorModeValue('gray.100', 'gray.800'),
      }}
      transition="all .3s ease"
      borderRadius="md"
      onClick={onLesson}
      bg={
        router.query.lesson === lesson._id
          ? useColorModeValue('gray.100', 'gray.800')
          : 'transparent'
      }
      fontWeight={router.query.lesson === lesson._id ? 'bold' : 'normal'}
      color={router.query.lesson === lesson._id ? 'facebook.500' : 'normal'}
    >
      <Flex
        justify="space-between"
        align="center"
        mt={2}
        p={4}
        cursor="pointer"
      >
        <Flex align="center" w="8%">
          {user ? (
            <Checkbox
              colorScheme="facebook"
              defaultChecked={lesson.completed.includes(user._id)}
            />
          ) : null}
        </Flex>
        <Flex w="92%" justify="space-between">
          <Text>{lesson.name}</Text>
          <Text textDecoration={'underline'} ml={1}>
            {getLessonTime(lesson.hour, lesson.minute, lesson.second)}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
