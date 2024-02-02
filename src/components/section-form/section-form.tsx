import { useActions } from "@/hooks/useActions"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { Button, useToast } from "@chakra-ui/react"
import { Form, Formik, FormikValues } from "formik"
import { useTranslation } from "react-i18next"
import ErrorAlert from "../error-alert/error-alert"
import TextField from "../text-field/text-field"
import { SectionFormProps } from "./section-form.props"

const SectionForm = ({onClose}: SectionFormProps) => {
  const { createSection, getSection, clearSectionError } = useActions()
  const { error, isLoading } = useTypedSelector(state => state.section)
  const { course } = useTypedSelector(state => state.instructor)
  const { t } = useTranslation()
  const toast = useToast()

  const onSubmit = (formValues: FormikValues) => {
    createSection({title: formValues.title, courseId: course?._id as string, callback: () => {
      toast({title: 'Successfully created section', position: 'top-right', isClosable: true})
      getSection({courseId: course?._id, callback: () => {}})
      onClose()
    }})
  }

  return (
    <Formik onSubmit={onSubmit} initialValues={{title: ''}}>
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