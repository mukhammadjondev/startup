import TextAreaField from '@/components/text-area-field/text-area-field';
import TextField from '@/components/text-field/text-field';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AuthService } from '@/services/auth.service';
import { FileService } from '@/services/file.service';
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
  useToast,
} from '@chakra-ui/react';
import { Form, Formik, FormikValues } from 'formik';
import Cookies from 'js-cookie';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

export default function Settings() {
  const [avatar, setAvatar] = useState<File>();
  const [values, setValues] = useState(data);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useTypedSelector(state => state.user);
  const toast = useToast();
  const { checkAuth } = useActions();
  const { t } = useTranslation();

  const onSubmit = async (formikValues: FormikValues) => {
    setIsLoading(true);
    try {
      let avatarUrl: string = user?.avatar as string;
      if (avatar) {
        const formData = new FormData();
        formData.append('image', avatar);
        const response = await FileService.fileUpload(formData, 'avatar');
        avatarUrl = response.url;
      }

      const data = { avatar: avatarUrl, ...formikValues };
      const response = await AuthService.updateUser(data);
      if (response) {
        const refreshToken = Cookies.get('refresh');
        if (refreshToken) checkAuth();
        setIsLoading(false);
        toast({
          title: 'Your profile updated successfully',
          status: 'success',
          position: 'top-right',
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onFileHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file && file.size > 2081800) {
      toast({
        title: "Rasm hajmi juda katta, kamida 2MB bo'lishi kerak",
        status: 'error',
      });
      return;
    }

    if (file.type == 'image/jpeg' || file.type == 'image/png') {
      setAvatar(file);
    } else {
      toast({
        title: "Xatolik, biz faqat PNG va JPG fayllarni qo'llab quvvatlaymiz",
        status: 'error',
      });
    }
  };

  const openFile = () => {
    const doc = document.getElementById('file');
    return doc?.click();
  };

  useEffect(() => {
    if (user) {
      const { fullName, job, bio, birthday } = user;
      const full = fullName?.split(' ') as string[];
      setValues({
        firstName: full?.[0],
        lastName: full?.[1],
        job: job as string,
        bio: bio as string,
        birthday: birthday as string,
      });
    }
  }, []);

  return (
    <>
      <HStack>
        <Avatar
          src={avatar ? URL.createObjectURL(avatar) : user?.avatar}
          name={user?.fullName}
          backgroundColor="facebook.500"
          size="xl"
        >
          {avatar ? (
            <AvatarBadge
              as={IconButton}
              size="sm"
              rounded="full"
              top="-10px"
              colorScheme="facebook"
              aria-label="remove image"
              icon={<AiOutlineClose />}
              onClick={() => setAvatar(undefined)}
            />
          ) : (
            <label>
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="facebook"
                aria-label="remove image"
                icon={<MdEdit />}
                onClick={openFile}
              />
              <input
                type="file"
                hidden
                accept="image/*"
                id="file"
                onChange={e => onFileHandler(e)}
              />
            </label>
          )}
        </Avatar>
        <VStack align="flex-start">
          <Text fontSize="xl" fontWeight="bold">
            {user?.fullName}
          </Text>
          <Text>
            <Box fontWeight="bold" as="span">
              {t('contact_email', { ns: 'global' })}
            </Box>
            : {user?.email}
          </Text>
        </VStack>
      </HStack>
      <Formik onSubmit={onSubmit} initialValues={values} enableReinitialize>
        <Form>
          <Flex
            gap={{ base: 1, md: 5 }}
            direction={{ base: 'column', md: 'row' }}
          >
            <TextField
              name="firstName"
              label={t('first_name', { ns: 'global' })}
              placeholder="Omar"
            />
            <TextField
              name="lastName"
              label={t('last_name', { ns: 'global' })}
              placeholder="Osman"
            />
          </Flex>
          <Flex
            gap={{ base: 1, md: 5 }}
            direction={{ base: 'column', md: 'row' }}
          >
            <TextField
              name="birthday"
              label={t('birthday', { ns: 'global' })}
              placeholder="birthday"
              type="date"
            />
            <TextField
              name="job"
              label={t('profession', { ns: 'global' })}
              placeholder="Front-End developer"
            />
          </Flex>
          <TextAreaField
            name="bio"
            placeholder={t('bio', { ns: 'global' })}
            label={t('information', { ns: 'global' })}
            height="100"
          />
          <Button
            mt={5}
            h={14}
            w="full"
            colorScheme="facebook"
            type="submit"
            isLoading={isLoading}
          >
            {t('account_recovery_btn_form3', { ns: 'global' })}
          </Button>
        </Form>
      </Formik>
    </>
  );
}

const data = {
  firstName: '',
  lastName: '',
  birthday: '',
  job: '',
  bio: '',
};
