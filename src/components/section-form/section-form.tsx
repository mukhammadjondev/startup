import { Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import TextField from "../text-field/text-field"

const SectionForm = () => {
  const onSubmit = () => {}

  return (
    <Formik onSubmit={onSubmit} initialValues={{title: ''}}>
      <Form>
        <TextField name='title' label='Title' />
        <Button h={14} mt={4} w='full' colorScheme='facebook' type='submit'>
          Submit
        </Button>
      </Form>
    </Formik>
  )
}

export default SectionForm