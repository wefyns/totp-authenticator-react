import { PropsWithChildren } from 'react'

export type ChildrenProps<T = unknown> = PropsWithChildren<T>

export type FormikField<T> = T & { name: string }
