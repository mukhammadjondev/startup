import { FC, useEffect, useState } from 'react';
import { BooksModalProps } from './books-modal.props';
import {
  Box,
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik, FormikValues } from 'formik';
import { BooksValidation } from '@/validations/books.validation';
import TextField from '../text-field/text-field';
import { useTranslation } from 'react-i18next';
import { coursePrice, createBooksCategory } from '@/config/constants';
import SelectField from '../select-field/select-field';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { FileUploader } from 'react-drag-drop-files';
import { loadImage } from '@/helpers/image.helper';
import { useActions } from '@/hooks/useActions';
import { FileService } from '@/services/file.service';
import { BooksType } from '@/interfaces/books.interface';
import ErrorAlert from '../error-alert/error-alert';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const BooksModal: FC<BooksModalProps> = ({
  isOpen,
  onClose,
  booksValue,
}): JSX.Element => {
  const [file, setFile] = useState<File | string | null>();
  const [errorFile, setErrorFile] = useState('');
  const [values, setValues] = useState(data);

  const { t } = useTranslation();
  const { startBooksLoading, createBooks, updateBooks, clearBooksError } =
    useActions();
  const { isLoading, error } = useTypedSelector(state => state.books);
  const toast = useToast();

  const handleChange = (file: File) => {
    setFile(file);
  };

  const onSubmit = async (formValues: FormikValues) => {
    if (!file) {
      setErrorFile(t('preview_image_is_required', { ns: 'global' }));
      return;
    }
    let imageUrl = file;
    if (typeof file !== 'string') {
      const formData = new FormData();
      formData.append('image', file as File);
      startBooksLoading();
      const response = await FileService.fileUpload(formData, 'books');
      imageUrl = response.url;
    }
    const { price, title, pdf, _id, category } = formValues as BooksType;

    if (booksValue) {
      updateBooks({
        price,
        title,
        pdf,
        _id,
        category,
        image: imageUrl as string,
        callback: () => {
          toast({
            title: t('successfully_edited', { ns: 'instructor' }),
            position: 'top-right',
            isClosable: true,
          });
          setFile(null);
          onClose();
        },
      });
    } else {
      createBooks({
        price,
        title,
        pdf,
        category,
        image: imageUrl as string,
        callback: () => {
          toast({
            title: t('successfully_created_course', { ns: 'instructor' }),
            position: 'top-right',
            isClosable: true,
          });
          setFile(null);
          onClose();
        },
      });
    }
    setErrorFile('');
  };

  useEffect(() => {
    if (booksValue) {
      setValues(booksValue);
      setFile(booksValue.image);
    } else {
      setValues(data);
      setFile(null);
    }
  }, [booksValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add books</ModalHeader>
        <ModalCloseButton />
        <Formik
          onSubmit={onSubmit}
          initialValues={values}
          validationSchema={BooksValidation.createBooks}
          enableReinitialize
        >
          <Form>
            <ModalBody>
              <>
                {error && (
                  <ErrorAlert
                    title={error as string}
                    clearHandler={clearBooksError}
                  />
                )}
              </>
              <VStack>
                <TextField
                  name="title"
                  label={t('title', { ns: 'instructor' })}
                  placeholder="Harry Poter"
                />
                <TextField name="pdf" label={t('pdf_link', { ns: 'admin' })} />
                <SelectField
                  name="price"
                  label={t('books_price', { ns: 'admin' })}
                  placeholder="-"
                  arrOptions={coursePrice}
                />
                <SelectField
                  name="category"
                  label={t('category', { ns: 'instructor' })}
                  placeholder="-"
                  arrOptions={createBooksCategory}
                />
                {file ? (
                  <Box pos="relative" w="full" h={200}>
                    <Image
                      src={
                        typeof file === 'string'
                          ? loadImage(file as string)
                          : URL.createObjectURL(file)
                      }
                      alt="preview image"
                      fill
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <Icon
                      as={FaTimes}
                      fontSize={20}
                      pos="absolute"
                      top={2}
                      right={2}
                      cursor="pointer"
                      onClick={() => setFile(null)}
                    />
                  </Box>
                ) : (
                  <Box>
                    <FileUploader
                      handleChange={handleChange}
                      name="file"
                      types={['JPG', 'PNG', 'GIF']}
                    />
                    {errorFile && (
                      <Text mt={2} fontSize="14px" color="red.500">
                        {errorFile}
                      </Text>
                    )}
                  </Box>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                isLoading={isLoading}
              >
                {booksValue
                  ? t('edit_book', { ns: 'admin' })
                  : t('add_book', { ns: 'admin' })}
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default BooksModal;

const data = {
  title: '',
  pdf: '',
  price: 0,
  category: '',
};
