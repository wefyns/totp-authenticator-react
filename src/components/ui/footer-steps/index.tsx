import { Step } from 'src/common/step-row'

import * as Styles from './styles'

interface SidenavStepsProps {
  step?: number
  steps?: number
}

export const FooterSteps = ({ step = 1, steps }: SidenavStepsProps): JSX.Element => {
  return (
    <Styles.Container>
      <Styles.List>
        {[...Array(steps)].map((_, i) => (
          <Step key={i.toString()} checked={i + 1 < step} current={i + 1 === step} />
        ))}
      </Styles.List>
    </Styles.Container>
  )
}
