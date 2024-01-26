import { Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react"
import { ErrorAlertProps } from "./error-alert.props"

const ErrorAlert = ({title, clearHandler}: ErrorAlertProps) => {
  return (
    <Alert status="error" pos='relative'>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <CloseButton pos='absolute' right={2} top={2} onClick={clearHandler} />
    </Alert>
  )
}

export default ErrorAlert