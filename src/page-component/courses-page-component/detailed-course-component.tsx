import { courses } from "@/config/constants"
import { CourseType } from "@/interfaces/course.interface"
import { Box, Button, Card, CardBody, Divider, Flex, Heading, Icon, Image, Stack, Tab, TabList, Tabs, Text, useMediaQuery } from "@chakra-ui/react"
import { format } from "date-fns"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BsBarChart } from "react-icons/bs"
import { FaBook, FaLanguage, FaRibbon, FaStar, FaUserGraduate, FaUserTie } from "react-icons/fa"
import { MdPlayLesson } from "react-icons/md"
import { TbCertificate } from "react-icons/tb"
import { TfiAlarmClock, TfiTimer } from "react-icons/tfi"
import { GiInfinity } from "react-icons/gi"
import ReactStars from "react-stars"
import { Curriculum, Mentor, Overview, Review } from "@/components"
import { useTranslation } from "react-i18next"

const DetailedCourseComponent = () => {
  const [course, setCourse] = useState<CourseType>()
  const [tabIndex, setTabIndex] = useState(0)

  const router = useRouter()
  const [media] = useMediaQuery('(min-width: 592px)')
  const { t } = useTranslation()

  useEffect(() => {
    const currentCourse = courses.find(c => c.slug === router.query.slug)
    setCourse(currentCourse)
  }, [router.query])

  const tabHandler = (idx: number) => {
		setTabIndex(idx);
	}

  return <>
    {/* Header content */}
    <Card>
      <CardBody pos='relative' p={{base: 2, md: 5}}>
        <Stack direction={{base: 'column', md: 'row'}} gap={5}>
          <Box w={{base: '100%', lg: '60%'}}>
            <Heading mt={5} fontSize='3xl'>{course?.title}</Heading>
            <Text mt={5}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid odit libero dolor deserunt. Totam, minus. Numquam sed beatae iure soluta.
            </Text>
            <Stack mt={5} direction={!media ? 'column' : 'row'} gap={1}>
              <Flex fontSize='sm' align='flex-end' gap={1}>
                <Text>5.0</Text>
                <ReactStars edit={false} value={5} />
                <Text>(10)</Text>
              </Flex>
              <Flex fontSize='sm' align='center' gap={1}>
                <Icon as={FaUserGraduate} />
                <Text>100 O'quvchilar</Text>
              </Flex>
              <Flex fontSize='sm' align='center' gap={1}>
                <Icon as={TfiAlarmClock} />
                <Text>Oxirgi yangilanish {format(new Date(), 'dd MMMM, yyyy')}</Text>
              </Flex>
            </Stack>
          </Box>
          <Box w={{base: '100%', lg: '39%'}} pos={{base: 'relative', lg: 'absolute'}} right={{base: 0, lg: 2}}>
            <Card variant='outlie' boxShadow='dark-lg'>
              <CardBody p={{base: 2, lg: 5}}>
                <Image src={course?.image} alt={course?.title} w='full' h='300px' style={{objectFit: 'cover', borderRadius: '8px'}} />
                <Stack mt={5} direction='row' align='flex-end' justify='space-between'>
                  <Heading fontSize='2xl'>Bepul</Heading>
                  <Text textDecoration='line-through'>
                    {course?.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                  </Text>
                </Stack>
                <Button mt={5} w='full' colorScheme='facebook' h={14}>
                  {t('enroll', {ns: 'courses'})}
                </Button>

                <Box mt={3}>
                  <Flex justify='space-between' align='center' p={2} fontSize='17px'>
                    <Flex align='center' gap={3}>
                      <MdPlayLesson />
                      <Text fontWeight='bold'>{t('lessons', {ns: 'courses'})}</Text>
                    </Flex>
                    <Text>{course?.lessonCount}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify='space-between' align='center' p={2} fontSize='17px'>
                    <Flex align='center' gap={3}>
                      <TfiTimer />
                      <Text fontWeight='bold'>{t('total_hour', {ns: 'courses'})}</Text>
                    </Flex>
                    <Text>{course?.totalHour} {t('hour', {ns: 'courses'})}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify='space-between' align='center' p={2} fontSize='17px'>
                    <Flex align='center' gap={3}>
                      <BsBarChart />
                      <Text fontWeight='bold'>{t('level', {ns: 'courses'})}</Text>
                    </Flex>
                    <Text>{course?.level}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify='space-between' align='center' p={2} fontSize='17px'>
                    <Flex align='center' gap={3}>
                      <FaLanguage />
                      <Text fontWeight='bold'>{t('language', {ns: 'courses'})}</Text>
                    </Flex>
                    <Text>English</Text>
                  </Flex>
                  <Divider />
                  <Flex justify='space-between' align='center' p={2} fontSize='17px'>
                    <Flex align='center' gap={3}>
                      <TbCertificate />
                      <Text fontWeight='bold'>{t('certificate', {ns: 'courses'})}</Text>
                    </Flex>
                    <Text>No</Text>
                  </Flex>
                  <Divider />
                  <Flex justify='space-between' align='center' p={2} fontSize='17px'>
                    <Flex align='center' gap={3}>
                      <GiInfinity />
                      <Text fontWeight='bold'>{t('access', {ns: 'courses'})}</Text>
                    </Flex>
                    <Text>Lifetime</Text>
                  </Flex>
                  <Divider />
                </Box>
              </CardBody>
            </Card>
          </Box>
        </Stack>
      </CardBody>
    </Card>

    {/* Tabs content */}
    <Tabs mt={5} mb='5vh' w={{ base: '100%', lg: '60%' }} orientation='horizontal' onChange={tabHandler} defaultValue={tabIndex} isFitted colorScheme='facebook'>
      <TabList>
        {tablist.map(tab => (
          <Tab key={tab.name} fontWeight='bold' textTransform='capitalize' w='100%' justifyContent='center'>
            <Icon as={tab.Icon} mr='2' display={{ base: 'none', md: 'block' }} />{' '}
            {t(tab.name, {ns: 'courses'})}
          </Tab>
        ))}
      </TabList>
      <Box w='full'>
        {tabIndex === 0 && <Overview />}
        {tabIndex === 1 && <Curriculum />}
        {tabIndex === 2 && <Review />}
        {tabIndex === 3 && <Mentor />}
      </Box>
    </Tabs>
  </>
}

export default DetailedCourseComponent

const tablist = [
	{
		name: 'overview',
		Icon: FaRibbon,
	},
	{
		name: 'curriculum',
		Icon: FaBook,
	},
	{
		name: 'review',
		Icon: FaStar,
	},
	{
		name: 'mentor',
		Icon: FaUserTie,
	},
]