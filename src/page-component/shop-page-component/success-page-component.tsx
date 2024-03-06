import {
  Button,
  Card,
  CardBody,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { BsFillPatchCheckFill } from 'react-icons/bs';

const SuccessPageComponent = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardBody>
        <Stack align="center" flexDirection="column">
          <Icon as={BsFillPatchCheckFill} w={20} h={20} color="green.500" />
          <Heading>{t('dashboard_success_title', { ns: 'global' })}</Heading>
          <Text>{t('dashboard_success_desc', { ns: 'global' })}</Text>
          <Link href="/dashboard">
            <Button w="container.sm" colorScheme="facebook" h={14}>
              {t('dashboard', { ns: 'global' })}
            </Button>
          </Link>
          <Image
            width={480}
            height={480}
            src="/images/success.png"
            alt="curriculum"
          />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default SuccessPageComponent;
