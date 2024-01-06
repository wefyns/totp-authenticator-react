/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldMetaProps } from 'formik'

export const controlError = <T = any>(meta: FieldMetaProps<T>, name: string, label?: string) => {
  const error = meta && meta.touched && meta.error
  if (!error) return undefined
  return error.replace(name, label || 'Value')
}
