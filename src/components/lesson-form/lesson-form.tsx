import { editLessonModules } from "@/config/editor.config"
import { Box, Button, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { Form, Formik, FormikValues } from "formik"
import dynamic from "next/dynamic"
import TextAreaField from "../text-area-field/text-area-field"
import TextField from "../text-field/text-field"

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})

const LessonForm = () => {
  const onSubmit = () => {}

  return (
    <Box p={5} mt={4} border='1px' borderRadius='lg' borderColor={useColorModeValue('gray.200', 'gray.500')}>
      <Formik onSubmit={onSubmit} initialValues={{material: ''}}>
        {formik => (
          <Form>
            <Stack spacing={5}>
              <TextField name='name' label='Name' />
              <TextAreaField name='embedVideo' label='Embed Video' />
              <Flex gap={3}>
                <TextField name='hour' label='Hour' type='number' />
                <TextField name='minute' label='Minute' type='number' />
                <TextField name='second' label='Second' type='number' />
              </Flex>
              <Box>
                <ReactQuill modules={editLessonModules} value={formik.values.material} onChange={data => formik.setFieldValue('material', data)} />
                {formik.errors.material && formik.touched.material && (
                  <Text mt={2} fontSize='14px' color='red.500'>
                    {formik.errors.material as string}
                  </Text>
                )}
              </Box>
              <Button h={14} mt={4} w='full' colorScheme='facebook' type='submit'>
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default LessonForm