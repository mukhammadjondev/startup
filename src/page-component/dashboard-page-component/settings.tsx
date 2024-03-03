import TextAreaField from '@/components/text-area-field/text-area-field';
import TextField from '@/components/text-field/text-field';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { MdEdit } from 'react-icons/md';

export default function Settings() {
  const { user } = useTypedSelector(state => state.user);

  const onSubmit = () => {};

  return (
    <>
      <HStack>
        <Avatar
          src={user?.avatar}
          name={user?.fullName}
          backgroundColor="facebook.500"
          size="xl"
        >
          <AvatarBadge
            as={IconButton}
            size="sm"
            rounded="full"
            top="-10px"
            colorScheme="facebook"
            aria-label="remove image"
            icon={<MdEdit />}
          />
        </Avatar>
        <VStack align="flex-start">
          <Text fontSize="xl" fontWeight="bold">
            {user?.fullName}
          </Text>
          <Text>
            <Box fontWeight="bold" as="span">
              Email
            </Box>
            : {user?.email}
          </Text>
        </VStack>
      </HStack>
      <Formik onSubmit={onSubmit} initialValues={{}}>
        <Form>
          <Flex gap={5}>
            <TextField name="firstName" label="Ismingiz" placeholder="Omar" />
            <TextField
              name="lastName"
              label="Familyangiz"
              placeholder="Osman"
            />
          </Flex>
          <Flex gap={5}>
            <TextField
              name="birthday"
              label="Tug'ilgan sana"
              placeholder="birthday"
              type="date"
            />
            <TextField
              name="job"
              label="Kasbingiz"
              placeholder="Front-End developer"
            />
          </Flex>
          <TextAreaField
            name="bio"
            placeholder="O'zingiz haqingizda"
            label="Ma'lumot"
            height="100"
          />
          <Button mt={5} h={14} w="full" colorScheme="facebook">
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
}
