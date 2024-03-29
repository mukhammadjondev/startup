import { FormikProps } from "formik"

export interface TagFieldProps {
  label: string
  name: string
  values: string[]
  placeholder: string
  errorMessage: string
  formik: FormikProps<any>
}