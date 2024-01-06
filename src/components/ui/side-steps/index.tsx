import { RefObject } from 'react'

import { Step } from 'src/common/step'

import * as Styles from './styles'

interface SidenavStepsProps {
  ref?: RefObject<HTMLDivElement>
  step?: number
  steps?: number
  labels?: Record<number, string>
  setStep?: (step: number) => void
}

export const SidenavSteps = ({
  ref,
  step = 0,
  steps,
  labels,
  setStep,
}: SidenavStepsProps): JSX.Element => {
  return (
    <Styles.Container ref={ref}>
      <Styles.List>
        {[...Array(steps)].map((_, i) => (
          <Step
            step={i}
            key={i.toString()}
            checked={i < step}
            label={labels?.[i]}
            current={i === step}
            isLast={i + 1 === steps}
            onClick={() => setStep && setStep(i + 1)}
          />
        ))}
      </Styles.List>
    </Styles.Container>
  )
}
