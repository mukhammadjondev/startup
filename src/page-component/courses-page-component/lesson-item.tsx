import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Checkbox, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { getLessonUrl } from '@/config/api.config';
import { LessonType } from '@/interfaces/instructor.interface';
import { getLessonTime } from '@/helpers/time.helper';
import $axios from '@/api/axios';

const LessonItem = ({ lesson }: { lesson: LessonType }) => {
  const [isComplete, setIsComplete] = useState(false);

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

  const onComplete = async (
    evt: ChangeEvent<HTMLInputElement>,
    lessonId: string
  ) => {
    setIsComplete(true);

    try {
      if (evt.target.checked) {
        await $axios.put(`${getLessonUrl('complete')}/${lessonId}`);
      } else {
        await $axios.put(`${getLessonUrl('uncomplete')}/${lessonId}`);
      }
      setIsComplete(false);
    } catch (error) {
      setIsComplete(false);
    }
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
              defaultChecked={lesson.completed.includes(user.id)}
              onChange={e => onComplete(e, lesson._id)}
              cursor={isComplete ? 'progress' : 'pointer'}
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

export default LessonItem;
