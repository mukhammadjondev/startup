import { getLessonTime } from '@/helpers/time.helper';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Icon,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { AiFillPlayCircle } from 'react-icons/ai';
import { GoDotFill } from 'react-icons/go';

const Curriculum = () => {
  const { t } = useTranslation();
  const { sections, pendingSection } = useTypedSelector(state => state.section);

  const color = useColorModeValue('white', 'black');
  const bgColor = useColorModeValue('facebook.500', 'facebook.200');

  return (
    <>
      <Heading mt={10}>{t('curriculum', { ns: 'courses' })}</Heading>
      {pendingSection ? (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <>
          <Flex align={'center'} gap={2} mt={3}>
            {sections.length} {t('modules', { ns: 'courses' })}{' '}
            <Icon as={GoDotFill} />{' '}
            {sections.map(c => c.lessons.length).reduce((a, b) => +a + +b, 0)}{' '}
            {t('lessons', { ns: 'courses' })}
          </Flex>
          <Accordion defaultIndex={[0]} allowToggle mr={2}>
            {sections.map(c => (
              <AccordionItem
                key={c.title}
                border="1px solid facebook.500"
                borderRadius="8px"
                mt={5}
              >
                <AccordionButton
                  height="60px"
                  background={bgColor}
                  color={color}
                  borderRadius="lg"
                  _hover={{
                    backgroundColor: 'facebook.400',
                  }}
                  fontWeight="bold"
                >
                  <Box flex="1" textAlign="left">
                    <AccordionIcon />
                    {c.title}
                  </Box>
                  <Flex flex={0}>
                    <Text fontSize="sm">
                      {c.lessons.length}&nbsp;{t('lesson', { ns: 'courses' })}
                    </Text>
                  </Flex>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {c.lessons.map(lesson => (
                    <Flex
                      key={lesson.name}
                      justify="space-between"
                      align="center"
                      py={2}
                    >
                      <Flex align="center" gap={2} w="80%">
                        <Icon
                          as={AiFillPlayCircle}
                          color="gray.600"
                          w={7}
                          h={7}
                        />
                        <Text>{lesson.name}</Text>
                      </Flex>
                      <Text fontSize="sm">
                        {getLessonTime(
                          lesson.hour,
                          lesson.minute,
                          lesson.second
                        )}
                      </Text>
                    </Flex>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </>
  );
};

export default Curriculum;
