import { useState } from "react"
import dynamic from "next/dynamic"
import { useTranslation } from "react-i18next"
import { FileUploader } from "react-drag-drop-files"
import { Form, Formik, FormikValues } from "formik"
import TextField from "../text-field/text-field"
import { Box, Button, Flex, FormLabel, Stack, Text } from "@chakra-ui/react"
import { editorModules } from "@/config/editor.config"
import { courseCategory, courseLevel, coursePrice } from "@/config/constants"
import { GiSave } from "react-icons/gi"
import 'react-quill/dist/quill.snow.css'
import TextAreaField from "../text-area-field/text-area-field"
import SelectField from "../select-field/select-field"
import TagField from "../tag-field/tag-field"
import { CourseValidation, manageCourseValues } from "@/validations/course.validation"
import { InstructorManageCourseProps, SubmitValuesInterface } from "./instructor-manage-course.props"

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

const InstructorManageCourse = ({titleBtn, submitHandler}: InstructorManageCourseProps) => {
	const [file, setFile] = useState<File>()

  const { t } = useTranslation()

	const handleChange = (file: File) => {
		setFile(file)
	}

  const onSubmit = (formData: FormikValues) => {
		const data = formData as SubmitValuesInterface
		submitHandler(data)
	}

  return <>
    <Formik onSubmit={onSubmit} initialValues={manageCourseValues} validationSchema={CourseValidation.manageValidation}>
      {formik => (
        <Form>
          <Flex mt={4} gap={4}>
            <Box w='70%'>
              <Stack spacing={5}>
                <TextField name='title' label='Title' placeholder='JavaScript from 0 to hero' />
                <TextAreaField name='excerpt' label='Excerpt' height="150px" placeholder="Full course about JavaScript" />
                <Flex gap={4}>
                  <TagField label='What will students learn in your courses?' name='learn' placeholder='Full project...' formik={formik} errorMessage={formik.touched.learn ? (formik.errors.learn as string) : ''} />
                  <TagField label='Requirements' name='requirements' placeholder='Basic JavaScript' formik={formik} errorMessage={formik.touched.requirements ? (formik.errors.requirements as string) : ''} />
                </Flex>
                <Box>
                  <FormLabel>
                    Description{' '}
                    <Box as='span' color='red.300'>*</Box>
                  </FormLabel>
                  <ReactQuill modules={editorModules} value={formik.values.description} onChange={data => formik.setFieldValue('description', data)} />
                  {formik.errors.description && formik.touched.description && (
                    <Text mt={2} fontSize='14px' color='red.500'>
                      {formik.errors.description as string}
                    </Text>
                  )}
                </Box>
                <Button w='full' type='submit' h={14} colorScheme='facebook' rightIcon={<GiSave />}>
                  {titleBtn}
                </Button>
              </Stack>
            </Box>
            <Box w='30%'>
              <Stack spacing={5}>
                <SelectField name='level' label='Level' placeholder='-' arrOptions={courseLevel} />
                <SelectField name='category' label='Category' placeholder='-' arrOptions={courseCategory} />
                <SelectField name='price' label='Price' placeholder='-' arrOptions={coursePrice} />
                <TagField label='Course tags' name='tags' placeholder='JavaScript...' formik={formik} errorMessage={formik.touched.tags ? (formik.errors.tags as string) : ''} />
                <Box>
                  <FormLabel>
                    Course preview image{' '}
                    <Box as='span' color='red.300'>*</Box>
                  </FormLabel>
                  <FileUploader handleChange={handleChange} name='file' types={['JPG', 'PNG', 'GIF']} />
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