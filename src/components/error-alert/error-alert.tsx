import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react"
import { ErrorAlertProps } from "./error-alert.props"

const ErrorAlert = ({title}: ErrorAlertProps) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
    </Alert>
  )
}

export default ErrorAlert