import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useTranslation } from "react-i18next"
import { FileUploader } from "react-drag-drop-files"
import { Form, Formik, FormikValues } from "formik"
import TextField from "../text-field/text-field"
import { Box, Button, Flex, FormLabel, Icon, Stack, Text } from "@chakra-ui/react"
import { editorModules } from "@/config/editor.config"
import { courseCategory, courseLevel, coursePrice, courseLng } from "@/config/constants"
import { GiSave } from "react-icons/gi"
import 'react-quill/dist/quill.snow.css'
import TextAreaField from "../text-area-field/text-area-field"
import SelectField from "../select-field/select-field"
import TagField from "../tag-field/tag-field"
import { CourseValidation, manageCourseValues } from "@/validations/course.validation"
import { InstructorManageCourseProps} from "./instructor-manage-course.props"
import { FileService } from "@/services/file.service"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import ErrorAlert from "../error-alert/error-alert"
import { useActions } from "@/hooks/useActions"
import Image from "next/image"
import { loadImage } from "@/helpers/image.helper"
import { FaTimes } from "react-icons/fa"
import { CourseType } from "@/interfaces/course.interface"

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

const InstructorManageCourse = ({titleBtn, submitHandler, courseValues}: InstructorManageCourseProps) => {
	const [file, setFile] = useState<File | string | null>()
  const [errorFile, setErrorFile] = useState('')
  const [initialValues, setInitialValues] = useState(manageCourseValues)

  const { t } = useTranslation()
  const { clearCourseError, startLoading } = useActions()
  const { error, isLoading } = useTypedSelector(state => state.course)

	const handleChange = (file: File) => {
		setFile(file)
	}

  const onSubmit = async (formValues: FormikValues) => {
    if(!file) {
      setErrorFile(t('preview_image_is_required', {ns: 'global'}))
      return
    }
    let imageUrl = file
    if(typeof file !== 'string') {
      const formData = new FormData()
      formData.append('image', file as File)
      startLoading()
      const response = await FileService.fileUpload(formData, 'preview-image')
      imageUrl = response.url
    }
		const data = {...formValues, previewImage: imageUrl} as CourseType
		submitHandler(data)
    setErrorFile('')
	}

  useEffect(() => {
    if(courseValues) {
      setInitialValues(courseValues)
      setFile(courseValues.previewImage)
    }
  }, [courseValues])

  return <>
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={CourseValidation.manageValidation} enableReinitialize>
      {formik => (
        <Form>
          <Flex mt={4} gap={4}>
            <Box w='70%'>
              <Stack spacing={5}>
                <TextField name='title' label={t('title', {ns: 'instructor'})} />
                <TextAreaField name='excerpt' label={t('excerpt', {ns: 'instructor'}) || 'Excerpt'} height="150px" />
                <TagField label={t('what_students_will_learn', {ns: 'instructor'})} name='learn' values={formik.values.learn} placeholder='' formik={formik} errorMessage={formik.touched.learn ? (formik.errors.learn as string) : ''} />
                <TagField label={t('requirements', {ns: 'instructor'})} name='requirements' values={formik.values.requirements} placeholder='' formik={formik} errorMessage={formik.touched.requirements ? (formik.errors.requirements as string) : ''} />
                <TagField label={t('course_tags', {ns: 'instructor'})} values={formik.values.tags} name='tags' placeholder='' formik={formik} errorMessage={formik.touched.tags ? (formik.errors.tags as string) : ''} />
                <Box>
                  <FormLabel>
                    {t('description', {ns: 'instructor'})}{' '}
                    <Box as='span' color='red.300'>*</Box>
                  </FormLabel>
                  <ReactQuill modules={editorModules} value={formik.values.description} onChange={data => formik.setFieldValue('description', data)} />
                  {formik.errors.description && formik.touched.description && (
                    <Text mt={2} fontSize='14px' color='red.500'>
                      {formik.errors.description as string}
                    </Text>
                  )}
                </Box>
                <>{error && <ErrorAlert title={error as string} clearHandler={clearCourseError} />}</>
                <Button w='full' type='submit' h={14} colorScheme='facebook' rightIcon={<GiSave />}  isLoading={isLoading} loadingText={`${t('loading', {ns: 'global'})}`}>
                  {titleBtn}
                </Button>
              </Stack>
            </Box>
            <Box w='30%'>
              <Stack spacing={5}>
                <SelectField name='level' label={t('level', {ns: 'instructor'})} placeholder='-' arrOptions={courseLevel} />
                <SelectField name='category' label={t('category', {ns: 'instructor'})} placeholder='-' arrOptions={courseCategory} />
                <SelectField name='price' label={t('price', {ns: 'instructor'})} placeholder='-' arrOptions={coursePrice} />
                <SelectField name='language' label={t('language', {ns: 'courses'})} placeholder='-' arrOptions={courseLng} />
                <Box>
                  <FormLabel>
                    {t('course_preview_image', {ns: 'instructor'})}{' '}
                    <Box as='span' color='red.300'>*</Box>
                  </FormLabel>

                  {file ? (
                    <Box pos='relative' w='full' h={200}>
                      <Image
                        src={typeof file === 'string' ? loadImage(file as string) : URL.createObjectURL(file)}
                        alt='preview image'
                        fill
                        style={{objectFit: 'cover', borderRadius: '8px'}}
                      />
                      <Icon as={FaTimes} fontSize={20} pos='absolute' top={2} right={2} cursor='pointer' onClick={() => setFile(null)} />
                    </Box>
                  ) : (
                    <Box>
                      <FileUploader handleChange={handleChange} name='file' types={['JPG', 'PNG', 'GIF']} />
                      {errorFile && (
                        <Text mt={2} fontSize='14px' color='red.500'>
                          {errorFile}
                        </Text>
                      )}
                    </Box>
                  )}
                </Box>
              </Stack>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  </>
}

export default InstructorManageCourse