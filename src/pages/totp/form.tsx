import { useState } from 'react'
import { Button, Input } from 'src/common'

import styles from './styles.module.css'

export const TOTPForm = ({
  labelValue = '',
  secretValue = '',
  onSubmit,
}: {
  labelValue?: string
  secretValue?: string
  onSubmit: (str1: string, str2: string) => void
}): JSX.Element => {
  const [label, setLabel] = useState(labelValue)
  const [secret, setSecret] = useState(secretValue)

  const handleSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    onSubmit(label, secret)
    setLabel('')
    setSecret('')
  }

  return (
    <form className={styles.totpForm} onSubmit={handleSubmit}>
      <Input
        type="text"
        value={label}
        placeholder="Label"
        onChange={e => setLabel(e.target.value)}
      />

      <Input
        type="text"
        value={secret}
        placeholder="Secret"
        onChange={e => setSecret(e.target.value)}
      />
      <div>
        <Button text="submit" type="submit" />
      </div>
    </form>
  )
}
