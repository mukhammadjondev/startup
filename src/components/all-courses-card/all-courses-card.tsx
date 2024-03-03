import { loadImage } from '@/helpers/image.helper';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsMinecartLoaded } from 'react-icons/bs';
import { CiViewList } from 'react-icons/ci';
import { SiGoogleanalytics } from 'react-icons/si';
import ReactStars from 'react-stars';
import { AllCourseCardProps } from './all-courses-card.props';

const AllCoursesCard = ({ course }: AllCourseCardProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { addCourseToCart } = useActions();
  const toast = useToast();
  const { courses } = useTypedSelector(state => state.cart);

  const onDetailedCourse = () => router.push(`/courses/${course.slug}`);

  const addCourseToCartHandler = () => {
    const existingProduct = courses.find(c => c._id === course._id);
    if (existingProduct) {
      toast({
        title: 'Book already exist in cart',
        position: 'bottom',
        status: 'warning',
      });
      return;
    }
    addCourseToCart(course);
    toast({ title: 'Course added successfully', position: 'bottom' });
  };

  return (
    <>
      <Box py={4}>
        <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
          <Image
            src={loadImage(course.previewImage)}
            alt={course.title}
            w={{ base: '100%', md: '250px' }}
            h="250px"
            borderRadius="lg"
            objectFit="cover"
            onClick={onDetailedCourse}
            cursor="pointer"
          />
          <Stack>
            <HStack>
              <Text color="#e59819">{course.reviewAvg || 0}</Text>
              <ReactStars
                edit={false}
                value={course.reviewAvg || 5}
                color2="#e59819"
              />
              <Text opacity=".8">({course.reviewCount})</Text>
            </HStack>
            <Heading fontSize="xl">{course.title}</Heading>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              beatae nemo, eos maiores culpa facere.
            </Text>
            <Flex gap={2} direction={{ base: 'column', sm: 'row' }}>
              <Avatar
                src={course.author.avatar}
                name={course.author.fullName}
              />
              <HStack>
                <Flex align="center" gap={1}>
                  <Icon as={CiViewList} />
                  <Text>{course.lessonCount} lesson</Text>
                </Flex>
                <Flex align="center" gap={1}>
                  <Icon as={AiOutlineClockCircle} />
                  <Text>{course.totalHour} hour</Text>
                </Flex>
                <Flex align="center" gap={1}>
                  <Icon as={SiGoogleanalytics} />
                  <Text>{t(course.level, { ns: 'courses' })}</Text>
                </Flex>
              </HStack>
            </Flex>
            <Divider />
            <Flex
              align={{ bae: 'flex-start', md: 'center' }}
              justify="space-between"
              direction={{ base: 'column', md: 'row' }}
            >
              <Text fontSize="xl" fontWeight="bold">
                {course.price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Text>
              <Flex gap={4} mt={{ base: 4, md: 0 }}>
                <Button
                  rightIcon={<BsMinecartLoaded />}
                  onClick={addCourseToCartHandler}
                  colorScheme="facebook"
                  isDisabled={
                    courses.map(c => c._id).includes(course._id) ? true : false
                  }
                >
                  Add to cart
                </Button>
                <Button
                  colorScheme="facebook"
                  variant="outline"
                  onClick={onDetailedCourse}
                >
                  Detail
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Box>
      <Divider />
    </>
  );
};

export default AllCoursesCard;
