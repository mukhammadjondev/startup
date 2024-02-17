import { AllCoursesCard } from '@/components';
import SectionTitle from '@/components/section-title/section-title';
import { coursesFilter } from '@/config/constants';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import ReactStars from 'react-stars';
import {
  FilterCourseType,
  FilterItemProps,
} from './courses-page-component.props';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CourseType } from '@/interfaces/course.interface';
import { AppService } from '@/services/app.service';

const CoursesPageComponent = () => {
  const [filter, setFilter] = useState<FilterCourseType>({
    id: '',
    category: '',
  });
  const [allCourses, setAllCourses] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t } = useTranslation();
  const { courses } = useTypedSelector(state => state.course);

  useEffect(() => {
    const getCoursesByLng = async (lng: string) => {
      setIsLoading(true);
      return await AppService.getCourses(lng);
    };

    if (filter.id === 'category') {
      setAllCourses(courses.filter(c => c.category === filter.category));
    } else if (filter.id === 'rating') {
      setAllCourses(
        courses.filter(c => c.reviewAvarage >= Number(filter.category))
      );
    } else if (filter.id === 'level') {
      setAllCourses(courses.filter(c => c.level === filter.category));
    } else if (filter.id === 'language') {
      getCoursesByLng(filter.category).then(res => {
        setIsLoading(false);
        setAllCourses(res);
      });
    }
  }, [filter]);

  useEffect(() => {
    setAllCourses(courses);
  }, [courses]);

  return (
    <>
      <SectionTitle
        title={t('title', { ns: 'courses' })}
        subtitle={t('description', { ns: 'courses' })}
      />
      <Box pos="relative" mt={5}>
        <Input
          h={14}
          w="full"
          bg="white"
          color="gray.900"
          placeholder={t('search_input_placeholder', { ns: 'courses' })}
          _placeholder={{ color: 'gray.500' }}
        />
        <Button
          pos="absolute"
          right={2}
          top={2}
          colorScheme="facebook"
          zIndex={99}
        >
          {t('search_input_btn', { ns: 'courses' })}
        </Button>
      </Box>
      <Flex mt={5} gap={5} direction={{ base: 'column', lg: 'row' }}>
        <Box
          w={{ base: '100%', lg: '30%' }}
          height="fit-content"
          p={5}
          border="1px"
          borderRadius="lg"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          {coursesFilter.map((course, idx) => (
            <FilterItem
              key={course.id}
              course={course}
              idx={idx}
              setFilter={setFilter}
            />
          ))}
        </Box>
        <Box w={{ base: '100%', lg: '70%' }}>
          {isLoading ? (
            <Flex h="60vh" justify="center" align="center">
              <Spinner />
            </Flex>
          ) : (
            <>
              {allCourses.map(course => (
                <AllCoursesCard key={course.title} course={course} />
              ))}
            </>
          )}
        </Box>
      </Flex>
    </>
  );
};
export default CoursesPageComponent;

const FilterItem = ({
  course,
  idx,
  setFilter,
}: {
  course: FilterItemProps;
  idx: number;
  setFilter: Dispatch<SetStateAction<FilterCourseType>>;
}) => {
  const { t } = useTranslation();

  const renderFilterItem = () => (
    <>
      {course.categoryList.map(c => (
        <Radio
          key={c.id}
          onChange={() => setFilter({ id: course.id, category: c.id })}
          value={c.id}
          colorScheme="facebook"
        >
          <Flex gap={2}>
            {course.id === 'rating' && (
              <ReactStars value={Number(c.id)} edit={false} color2="#e59819" />
            )}
            {t(c.name, { ns: 'courses' })}
          </Flex>
        </Radio>
      ))}
    </>
  );

  return (
    <Accordion allowToggle defaultIndex={idx === 0 ? 0 : idx}>
      <AccordionItem borderTop="none">
        <AccordionButton>
          <Text fontSize="xl" flex="1" textAlign="left">
            {t(course.title, { ns: 'courses' })}
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <RadioGroup>
            <Stack>{renderFilterItem()}</Stack>
          </RadioGroup>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
