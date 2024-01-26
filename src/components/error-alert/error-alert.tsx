import { Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { ErrorAlertProps } from "./error-alert.props"

const ErrorAlert = ({title, clearHandler}: ErrorAlertProps) => {
  const { t } = useTranslation()

  return (
    <Alert status="error" pos='relative'>
      <AlertIcon />
      <AlertTitle>{t(title, {ns: 'global'})}</AlertTitle>
      <CloseButton pos='absolute' right={2} top={2} onClick={clearHandler} />
    </Alert>
  )
}

export default ErrorAlert