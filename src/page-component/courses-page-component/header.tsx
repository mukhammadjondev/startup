import TextAreaField from '@/components/text-area-field/text-area-field';
import TextField from '@/components/text-field/text-field';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { DarkLogo, LightLogo } from '@/icons';
import { CourseService } from '@/services/course.service';
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik, FormikValues } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsFillMoonFill } from 'react-icons/bs';
import { FaRegCommentDots, FaTelegram } from 'react-icons/fa';
import { FiLogOut, FiSun } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi';
import ReactStars from 'react-stars';

const Header = () => {
  const [reviewVal, setReviewVal] = useState(val);
  const [reviewId, setReviewId] = useState<string>();

  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { course } = useTypedSelector(state => state.course);
  const { user } = useTypedSelector(state => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onReviewSubmit = async (formikValues: FormikValues) => {
    try {
      if (reviewId) {
        const data = {
          summary: formikValues.summary,
          rating: formikValues.rating,
        };

        await CourseService.editReview(data, reviewId);
        toast({ title: 'Successfully edited', status: 'success' });
        setReviewId('');
        onClose();
      } else {
        const response = await CourseService.getReviewByUser({
          course: course?._id,
          user: user?._id,
        });

        if (response._id) {
          setReviewVal({
            ...reviewVal,
            summary: response.summary,
            rating: response.rating,
          });
          setReviewId(response._id);
          toast({
            title: 'Already have review, you can change it now',
            status: 'warning',
          });
        } else {
          const data = {
            course: course?._id,
            author: user?._id,
            rating: formikValues.rating,
            summary: formikValues.summary,
          };
          await CourseService.createReview(data);
          toast({
            title: 'Successfully created new review',
            status: 'success',
          });
          onClose();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setReviewVal({
      ...reviewVal,
      name: user?.fullName as string,
      email: user?.email as string,
    });
  }, [user]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={99}
      h="10vh"
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Stack
        h="10vh"
        w="90%"
        mx="auto"
        direction="row"
        align="center"
        justify="space-between"
      >
        <Stack gap={{ base: 0, md: 2 }} direction="row">
          <Link href="/">
            {colorMode === 'light' ? <DarkLogo /> : <LightLogo />}
          </Link>
        </Stack>

        <Stack direction="row" align="center">
          <IconButton
            colorScheme="facebook"
            variant="ghost"
            onClick={toggleColorMode}
            icon={colorMode == 'light' ? <BsFillMoonFill /> : <FiSun />}
            aria-label="moon"
          />
          <IconButton
            colorScheme="telegram"
            variant="ghost"
            onClick={() => window.open('https://t.me/')}
            icon={<FaTelegram />}
            aria-label="messenger"
            display={{ base: 'none', md: 'flex' }}
          />
          <IconButton
            onClick={onOpen}
            colorScheme="facebook"
            variant="outline"
            icon={<FaRegCommentDots />}
            aria-label="comments"
            display={{ base: 'none', md: 'flex' }}
          />
          <Button
            leftIcon={<HiHeart color="red" />}
            onClick={() => window.open('https://t.me/')}
            colorScheme="facebook"
            display={{ base: 'none', md: 'flex' }}
          >
            Sponsor
          </Button>
          <IconButton
            onClick={() => router.push(`/courses/${course?.slug}`)}
            colorScheme="red"
            variant="outline"
            icon={<FiLogOut />}
            aria-label="comments"
          />
        </Stack>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        >
          <ModalContent>
            <ModalHeader>Izoh</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <Formik
              initialValues={reviewVal}
              onSubmit={onReviewSubmit}
              enableReinitialize
            >
              {formik => (
                <Form>
                  <ModalBody>
                    <Text fontWeight="bold" mb="1rem">
                      Kurs haqida o'z fikringizni yozishingiz mumkin.
                    </Text>
                    <Flex gap={2}>
                      <TextField
                        name="email"
                        label="Email manzilingiz"
                        disabled={true}
                      />
                      <TextField name="name" label="Ismingiz" disabled={true} />
                    </Flex>
                    <Box mt={2}>
                      <ReactStars
                        edit={true}
                        size={20}
                        value={formik.values.rating}
                        onChange={e => formik.setFieldValue('rating', e)}
                      />
                    </Box>
                    <Box mt={2}>
                      <TextAreaField
                        name="summary"
                        label="Izohingiz"
                        resize="none"
                        height="150px"
                        placeholder="Men ushbu kursni ko'rib bir texnologiyani to'liq o'rgana oldim. Kurslar ham amaliy ham nazariy ekan...."
                      />
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type="submit"
                      w="full"
                      h={14}
                      colorScheme="facebook"
                    >
                      Submit
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
};

export default Header;

const val = {
  email: '',
  name: '',
  rating: 0,
  summary: '',
};
