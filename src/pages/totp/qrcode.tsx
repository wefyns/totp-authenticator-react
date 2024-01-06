import qrcodeParser from 'qrcode-parser'
import { ClipboardEvent, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from 'src/common'
import styles from './styles.module.css'
import { TOTPForm } from './form'

export const QRCodeScanner = ({
  onSubmit,
}: {
  onSubmit: (str1: string, str2: string) => void
}): JSX.Element => {
  const [isAddFormVisible, setAddFormVisible] = useState(false)

  const [secret, setSecret] = useState('')
  const [label, setLabel] = useState('')

  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [qrCodeData, setQRCodeData] = useState<string | null>(null)

  const onDrop = (acceptedFiles: File[]): void => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0]
      const reader = new FileReader()

      reader.onload = e => {
        if (e.target) {
          setUploadedImage(e.target.result as string)
          setQRCodeData(null)
        }
      }

      reader.readAsDataURL(uploadedFile)
    }
  }

  useEffect(() => {
    const handle = async (): Promise<void> => {
      if (uploadedImage) {
        const result = await qrcodeParser(uploadedImage)
        setQRCodeData(result)

        const url = new URL(result)
        const secret = url.searchParams.get('secret')
        const issuer = url.searchParams.get('issuer')
        const label = url.searchParams.get('label')
        setSecret(secret ?? 'unknown')
        setLabel(label ?? issuer ?? 'unknown')
      }
    }

    void handle()
  }, [uploadedImage])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handlePaste = async (event: ClipboardEvent): Promise<void> => {
    const clipboardData = event.clipboardData
    if (clipboardData) {
      const items = clipboardData.items
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.type.startsWith('image')) {
          const blob = item.getAsFile()
          if (blob) {
            const reader = new FileReader()
            reader.onload = e => {
              if (e.target) {
                setUploadedImage(e.target.result as string)
                setQRCodeData(null)
              }
            }
            reader.readAsDataURL(blob)
          }
          break
        }
      }
    }
  }

  useEffect(() => {
    //  @ts-ignore
    document.addEventListener('paste', handlePaste)
    return () => {
      //  @ts-ignore
      document.removeEventListener('paste', handlePaste)
    }
  }, [])

  if (isAddFormVisible) {
    return (
      <TOTPForm
        secretValue={secret}
        labelValue={label}
        onSubmit={() => {
          onSubmit(label, secret)
          setAddFormVisible(false)
        }}
      />
    )
  }

  return (
    <div className={styles.qrcodeContainer}>
      <h1>QR Code Scanner</h1>
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        <p>{"Drag'n drop an image containing a QR code here, or click to select one."}</p>
      </div>

      <p className={styles.qrCodeHint}>
        {'Also you can use Ctrl + C or Cmd + C (Mac) to paste the image from clipboard'}
      </p>

      {uploadedImage && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={uploadedImage} alt="Uploaded" className={styles.image} />
        </div>
      )}

      {qrCodeData && (
        <div>
          <h2>QR Code Data:</h2>
          <p>{qrCodeData}</p>
        </div>
      )}

      <Button disabled={!qrCodeData} text="Done" onClick={() => setAddFormVisible(true)} />
    </div>
  )
}
