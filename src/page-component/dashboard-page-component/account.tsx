import { StatsCardProps } from '@/components/stats-card/stats-card.props';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import {
  Box,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { MdAlternateEmail, MdUpdate } from 'react-icons/md';
import { SiAwesomelists } from 'react-icons/si';

export default function Account() {
  const { user } = useTypedSelector(state => state.user);

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign="center" fontSize="4xl" pb={6} fontWeight="bold">
        Your account information.
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title="Ro'yhatdan o'tgan sana"
          stat={`${format(new Date(user?.createdAt as Date), 'dd MMMM, yyyy')}`}
          icon={<MdUpdate size="3em" />}
        />
        <StatsCard
          title="Email manzilingiz"
          stat={user?.email as string}
          icon={<MdAlternateEmail size="3em" />}
        />
        <StatsCard
          title="Kurslar"
          stat={`${user?.courses.length} ta`}
          icon={<SiAwesomelists size="3em" />}
        />
      </SimpleGrid>
    </Box>
  );
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;

  return (
    <Stat
      px={2}
      py={5}
      shadow="xl"
      border="1px solid"
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded="lg"
    >
      <Flex justifyContent="space-between">
        <Box>
          <StatLabel fontWeight="medium">{title}</StatLabel>
          <StatNumber fontSize="lg" fontWeight="bold">
            {stat.length > 13 ? `${stat.slice(0, 13)}...` : stat}
          </StatNumber>
        </Box>
        <Box
          my="auto"
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent="center"
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
