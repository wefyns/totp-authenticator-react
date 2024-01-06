import { FC } from 'react'

import { Pict } from './assets'
import styles from './styles.module.css'

interface StaticPictureProps {
  picture: string
}

export const StaticPicture: FC<StaticPictureProps> = ({ picture }) => {
  return (
    <div className={styles.blockPicture}>
      <img src={Pict[picture]} alt="error in the name" className={styles.imgStyle} />
    </div>
  )
}