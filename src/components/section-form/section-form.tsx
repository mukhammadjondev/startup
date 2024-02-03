import { useActions } from "@/hooks/useActions"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { CourseValidation } from "@/validations/course.validation"
import { Button, useToast } from "@chakra-ui/react"
import { Form, Formik, FormikValues } from "formik"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import ErrorAlert from "../error-alert/error-alert"
import TextField from "../text-field/text-field"
import { SectionFormProps } from "./section-form.props"

const SectionForm = ({onClose, values}: SectionFormProps) => {
  const [initialValues, setInitialValues] = useState<{ title: string }>({ title: '' })

  const { createSection, editSection, clearSectionError } = useActions()
  const { error, isLoading } = useTypedSelector(state => state.section)
  const { course } = useTypedSelector(state => state.instructor)
  const { t } = useTranslation()
  const toast = useToast()

  const onSubmit = (formValues: FormikValues) => {
    if(values) {
      editSection({sectionId: values.id, title: formValues.title, callback: () => {
        toast({title: 'Successfully edited section', position: 'top-right', isClosable: true})
        onClose()
      }})
    } else {
      createSection({title: formValues.title, courseId: course?._id as string, callback: () => {
        toast({title: 'Successfully created section', position: 'top-right', isClosable: true})
        onClose()
      }})
    }
  }

  useEffect(() => {
		setInitialValues({title: values?.title as string})
	}, [values])

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={CourseValidation.section} enableReinitialize>
      <Form>
        <>{error && <ErrorAlert title={error as string} clearHandler={clearSectionError} />}</>
        <TextField name='title' label='Title' />
        <Button h={14} mt={4} w='full' colorScheme='facebook' type='submit' isLoading={isLoading} loadingText={`${t('loading', {ns: 'global'})}`}>
          Submit
        </Button>
      </Form>
    </Formik>
  )
}

export default SectionForm