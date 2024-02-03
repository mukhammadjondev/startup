import Image from "next/image"
import SectionTitle from "@/components/section-title/section-title"
import { Accordion, Card, CardBody, Divider, Flex, HStack, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Skeleton, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { SectionAccordion } from "@/components"
import SectionForm from "@/components/section-form/section-form"
import { useActions } from "@/hooks/useActions"
import { useEffect, useState } from "react"

const CurriculumPageComponent = () => {
  const [sectionTitle, setSectionTitle] = useState<{title: string; id: string} | null>({title: '', id: ''})

  const { course } = useTypedSelector(state => state.instructor)
  const { isOpen, onOpen, onClose } = useDisclosure()
	const { getSection } = useActions()
	const { pendingSection, sections } = useTypedSelector(state => state.section)
	const toast = useToast()

  const onCreateSection = () => {
		onOpen()
		setSectionTitle(null)
	}

	useEffect(() => {
    if(course?._id) {
      getSection({courseId: course._id, callback: () => {
        toast({title: 'Successfully get sections', position: 'top-right', isClosable: true})
      }})
    }
	}, [course])

  return <>
    <Card>
      <CardBody>
        <HStack justify='center'>
          <Image width={480} height={480} src='/images/curriculum.png' alt='curriculum' />
          <Stack>
            <SectionTitle title={course?.title as string} subtitle='Manage curriculum for your course' />
          </Stack>
        </HStack>
      </CardBody>
    </Card>

    <Card mt={10}>
      <CardBody>
        <Flex mb={5} justify='space-between' align='center'>
          <Text fontSize='2xl'>Create section</Text>
          <Icon as={BsFillPlusCircleFill} w={6} h={6} cursor='pointer' onClick={onCreateSection} />
        </Flex>

				{pendingSection ? (
					<Stack>
						<Skeleton height={35} />
						<Skeleton height={35} />
						<Skeleton height={35} />
					</Stack>
				) : (
					<Accordion allowToggle onDragOver={e => e.preventDefault()}>
						{sections.map((section, idx) => (
							<SectionAccordion key={section._id} section={section} sectionIdx={idx} setSectionTitle={setSectionTitle} onOpen={onOpen} />
						))}
					</Accordion>
				)}
      </CardBody>
    </Card>

    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create section</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody pb={5}>
          <SectionForm onClose={onClose} values={sectionTitle} />
        </ModalBody>
      </ModalContent>
    </Modal>
  </>
}

export default CurriculumPageComponent