import { Dropdown, RoundButton } from 'src/common'
import { DropdownItem } from 'src/common/dropdown/item'
import { Icons } from 'src/assets/icons'
import { useAlert } from 'src/common/alert'
import { Totp } from './types'

import styles from './styles.module.css'

export const TotpItem = ({
  item,
  copy,
  remove,
}: {
  item: Totp
  copy: (str: string) => void
  remove: () => void
}): JSX.Element => {
  const alert = useAlert()

  return (
    <div className={styles.item}>
      <div
        onClick={() => {
          copy(item.currentOTP)
          alert.success('Copied')
        }}
        className={styles.itemTextContainer}
      >
        <p className={styles.title}>{item.label}</p>
        <p className={styles.code}>{item.currentOTP}</p>
      </div>

      <div className={styles.dropDownContainer}>
        <Dropdown
          button={
            <div className={styles.dropDownButtonRight}>
              <RoundButton icon={<Icons.Edit />} />
            </div>
          }
        >
          <DropdownItem
            onClick={() => {
              copy(item.currentOTP)
              alert.success('Copied')
            }}
          >
            Copy
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              remove()
              alert.success('Removed')
            }}
          >
            Remove
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  )
}
