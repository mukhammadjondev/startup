import TextField from '@/components/text-field/text-field';
import { Box, Button, Divider, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

export default function DangerZone() {
  const onSubmit = () => {};

  return (
    <>
      <Text fontSize="2xl">Change password</Text>
      <Divider my={5} />
      <Box maxW={'70%'}>
        <Formik onSubmit={onSubmit} initialValues={{}}>
          <Form>
            <TextField
              name="old-password"
              label="Old password"
              placeholder="****"
            />
            <TextField name="password" label="Password" placeholder="****" />
            <TextField
              name="confirm-password"
              label="Confirm Password"
              placeholder="****"
            />
            <Button h={14} w="full" mt={5} colorScheme="facebook">
              Submit
            </Button>
          </Form>
        </Formik>
      </Box>
    </>
  );
}
