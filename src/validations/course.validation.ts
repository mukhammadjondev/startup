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
	}
}