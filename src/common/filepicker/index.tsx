import React, { useRef, ChangeEvent } from 'react'

interface CustomFilePickerProps {
  onChange: (file: File) => void
  text: string
}

export const CustomFilePicker: React.FC<CustomFilePickerProps> = ({
  onChange,
  text,
}): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const openFileDialog = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onChange(selectedFile)
    }
  }

  return (
    <div>
      <div onClick={openFileDialog}>{text}</div>
      <input
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={fileInputRef}
      />
    </div>
  )
}
