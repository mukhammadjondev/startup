import { useTypedSelector } from '@/hooks/useTypedSelector';
import { DarkLogo, LightLogo } from '@/icons';
import {
  Box,
  Button,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiLogOut } from 'react-icons/bi';
import { BsFillMoonFill } from 'react-icons/bs';
import { FaRegCommentDots, FaTelegram } from 'react-icons/fa';
import { FiLogOut, FiSun } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { course } = useTypedSelector(state => state.course);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={99}
      h="10vh"
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Stack
        h="10vh"
        w="90%"
        mx="auto"
        direction="row"
        align="center"
        justify="space-between"
      >
        <Stack gap={{ base: 0, md: 2 }} direction="row">
          <Link href="/">
            {colorMode === 'light' ? <DarkLogo /> : <LightLogo />}
          </Link>
        </Stack>

        <Stack direction="row" align="center">
          <IconButton
            colorScheme="facebook"
            variant="ghost"
            onClick={toggleColorMode}
            icon={colorMode == 'light' ? <BsFillMoonFill /> : <FiSun />}
            aria-label="moon"
          />
          <IconButton
            colorScheme="telegram"
            variant="ghost"
            onClick={() => window.open('https://t.me/')}
            icon={<FaTelegram />}
            aria-label="messenger"
            display={{ base: 'none', md: 'flex' }}
          />
          <IconButton
            // onClick={onOpen}
            colorScheme="facebook"
            variant="outline"
            icon={<FaRegCommentDots />}
            aria-label="comments"
            display={{ base: 'none', md: 'flex' }}
          />
          <Button
            leftIcon={<HiHeart color="red" />}
            onClick={() => window.open('https://t.me/')}
            colorScheme="facebook"
            display={{ base: 'none', md: 'flex' }}
          >
            Sponsor
          </Button>
          <IconButton
            onClick={() => router.push(`/courses/${course?.slug}`)}
            colorScheme="red"
            variant="outline"
            icon={<FiLogOut />}
            aria-label="comments"
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
