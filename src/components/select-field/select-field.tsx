import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react"
import { FieldHookConfig, useField } from "formik"
import { useTranslation } from "react-i18next"
import { SelectFieldProps } from "./select-field.props"

const SelectField = ({label, placeholder, arrOptions, ...props}: SelectFieldProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props)
  const { t } = useTranslation()

  return (
    <FormControl isRequired mt={15} isInvalid={!!meta.touched && !!meta.error}>
      <FormLabel>{label}</FormLabel>
      <Select borderRadius='8px' placeholder={placeholder} height={14} focusBorderColor='facebook.500' {...field}>
        {arrOptions.map(option => (
          <option key={option} value={option}>
            {t(`${typeof option === 'string' ?
              option :
              option.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`,
              {ns: 'courses'}
            )}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default SelectField