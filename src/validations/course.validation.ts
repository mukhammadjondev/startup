import * as Yup from 'yup'

interface Type {
	title: string
	excerpt: string
	learn: string[]
	requirements: string[]
	description: string
	level: string
	category: string
	price: number
	tags: string[]
}

export const manageCourseValues: Type = {
	title: '',
	excerpt: '',
	learn: [],
	requirements: [],
	description: '',
	level: '',
	category: '',
	price: 0,
	tags: [],
}

interface LessonTypeValues {
	name: string
	embedVideo: string
	hour: number
	minute: number
	second: number
	material: string
}

export const manageLessonValues: LessonTypeValues = {
	name: '',
	embedVideo: '',
	hour: 0,
	minute: 0,
	second: 0,
	material: '',
}

export const CourseValidation = {
	manageValidation() {
		return Yup.object({
			title: Yup.string()
				.min(8, 'Title should be minimum 8 character')
				.required('Title is required'),
			excerpt: Yup.string()
				.min(15, 'Excerpt should be minimum 15 character')
				.required('Excerpt is required'),
			learn: Yup.array().required('Learn is required'),
			requirements: Yup.array().required('Requirements is required'),
			tags: Yup.array().required('Tags is required'),
			description: Yup.string()
				.min(100, 'Description should be minimum 100 characters')
				.required('Description is required'),
			level: Yup.string().required('Level is required'),
			category: Yup.string().required('Category is required'),
			price: Yup.string().required('Price is required'),
		})
	},
	section() {
		return Yup.object({
			title: Yup.string().required('Title is required'),
		})
	},
	lesson() {
		return Yup.object({
			name: Yup.string().required('Name is required'),
			embedVideo: Yup.string().required('Embed video is required'),
			hour: Yup.number().required('Hour is required'),
			minute: Yup.number().required('Minute is required'),
			second: Yup.number().required('Second is required'),
		})
	},
}