import { TextareaProps } from "@chakra-ui/react";

export interface TextAreaFieldProps extends TextareaProps {
  label: string
  placeholder?: string
  height?: string
  resize?: 'none' | 'horizontal'
}