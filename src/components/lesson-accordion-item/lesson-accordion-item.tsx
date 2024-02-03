import { useActions } from "@/hooks/useActions"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { LessonType, SectionType } from "@/interfaces/instructor.interface"
import { Collapse, Flex, Icon, Text, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react"
import { DragEvent } from "react"
import { FaEdit } from "react-icons/fa"
import { FiDelete } from "react-icons/fi"
import LessonForm from "../lesson-form/lesson-form"
import { LessonAccordionProps } from "./lesson-accordion.props"

const LessonAccordionItem = ({lesson, lessonIdx, sectionId}: LessonAccordionProps) => {
  const { isOpen, onToggle } = useDisclosure()
  const { deleteLesson, editSection } = useActions()
  const { sections, isLoading } = useTypedSelector(state => state.section)
  const toast = useToast()

  const onDeleteLesson = () => {
    const isAgree = confirm('Are you sure?')

    if(isAgree) {
      deleteLesson({lessonId: lesson._id, sectionId, callback: () => {
        toast({title: 'Successfully deleted lesson', position: 'top-right', isClosable: true})
      }})
    }
  }

  const onDragStartLesson = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('lessonIdx', String(lessonIdx))
  }

  const onDropLesson = (e: DragEvent<HTMLDivElement>) => {
    const movingLessonIdx = Number(e.dataTransfer.getData('lessonIdx'))
    const currentSection = sections.find(c => c._id == sectionId) as SectionType
    const allLessons = [...currentSection.lessons] as LessonType[]
    const movingItem = allLessons[movingLessonIdx]
    allLessons.splice(movingLessonIdx, 1)
    allLessons.splice(lessonIdx, 0, movingItem)
    const editedIdx = allLessons.map(c => c._id)
    editSection({sectionId, lessons: editedIdx, callback: () => {}})
  }

  return <>
    <Flex py={3} w='full' cursor={isLoading ? 'progress' : 'pointer'} justify='space-between' align='center' borderColor={useColorModeValue('gray.200', 'gray.600')} draggable onDragStart={onDragStartLesson} onDrop={onDropLesson}>
      <Flex align='center' gap={2} w='80%'>
        <Icon as={FaEdit} onClick={onToggle} />
        <Text>{lesson.name}</Text>
      </Flex>
      <Flex gap={3}>
        <Icon as={FiDelete} cursor='pointer' onClick={onDeleteLesson} />
      </Flex>
    </Flex>
    <Collapse in={isOpen} animateOpacity>
      <LessonForm values={lesson} onToggle={onToggle} />
    </Collapse>
  </>
}

export default LessonAccordionItem