import { editLessonModules } from '@/config/editor.config';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { LessonType } from '@/interfaces/instructor.interface';
import {
  CourseValidation,
  manageLessonValues,
} from '@/validations/course.validation';
import {
  Box,
  Button,
  Flex,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik, FormikValues } from 'formik';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorAlert from '../error-alert/error-alert';
import TextAreaField from '../text-area-field/text-area-field';
import TextField from '../text-field/text-field';
import { LessonFormProps } from './lesson-form.props';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const LessonForm = ({ sectionId, values, onToggle }: LessonFormProps) => {
  const [initialValues, setInitialValues] = useState(manageLessonValues);
  const { createLesson, editLesson, clearLessonError } = useActions();
  const { error, isLoading } = useTypedSelector(state => state.section);
  const { t } = useTranslation();
  const toast = useToast();

  const onSubmit = (formValues: FormikValues, { resetForm }) => {
    const data = formValues as LessonType;
    if (values) {
      editLesson({
        lessonId: values._id,
        ...data,
        callback: () => {
          toast({
            title: t('successfully_edited', { ns: 'instructor' }),
            position: 'top-right',
            isClosable: true,
          });
          onToggle();
          resetForm();
        },
      });
    } else {
      createLesson({
        ...data,
        sectionId,
        callback: () => {
          toast({
            title: t('successfully_created_course', { ns: 'instructor' }),
            position: 'top-right',
            isClosable: true,
          });
          onToggle();
          resetForm();
        },
      });
    }
  };

  useEffect(() => {
    if (values) {
      setInitialValues(values);
    }
  }, [values]);

  return (
    <Box
      p={5}
      mt={4}
      border="1px"
      borderRadius="lg"
      borderColor={useColorModeValue('gray.200', 'gray.500')}
    >
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={CourseValidation.lesson}
        enableReinitialize
      >
        {formik => (
          <Form>
            <Stack spacing={5}>
              <>
                {error && (
                  <ErrorAlert
                    title={error as string}
                    clearHandler={clearLessonError}
                  />
                )}
              </>
              <TextField name="name" label={t('name', { ns: 'instructor' })} />
              <TextAreaField
                name="embedVideo"
                label={t('embed_video', { ns: 'instructor' }) || 'Embed video'}
              />
              <Flex gap={3}>
                <TextField
                  name="hour"
                  label={t('hour', { ns: 'instructor' })}
                  type="number"
                />
                <TextField
                  name="minute"
                  label={t('minute', { ns: 'instructor' })}
                  type="number"
                />
                <TextField
                  name="second"
                  label={t('second', { ns: 'instructor' })}
                  type="number"
                />
              </Flex>
              <Box>
                <ReactQuill
                  modules={editLessonModules}
                  value={formik.values.material}
                  onChange={data => formik.setFieldValue('material', data)}
                />
              </Box>
              <Button
                h={14}
                mt={4}
                w="full"
                colorScheme="facebook"
                type="submit"
                isLoading={isLoading}
                loadingText={`${t('loading', { ns: 'global' })}`}
              >
                {t('search_input_btn', { ns: 'courses' })}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LessonForm;
