import * as OTPAuth from 'otpauth'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import { Icons } from 'src/assets/icons'
import { Dropdown, RoundButton } from 'src/common'
import { DropdownItem } from 'src/common/dropdown/item'
import { CustomFilePicker } from 'src/common/filepicker'
import { Modal } from 'src/common/modal'
import { useCopyToClipboard } from 'usehooks-ts'
import { TOTPForm } from './form'
import { TotpItem } from './item'
import { Totp } from './types'

import { QRCodeScanner } from './qrcode'
import styles from './styles.module.css'

const generateTotp = ({ label, secret }: { label: string; secret: string }): Totp => {
  const totp = new OTPAuth.TOTP({
    label,
    secret,
    digits: 6,
    period: 30,
    issuer: label,
    algorithm: 'SHA1',
  })

  const newTotp = {
    label,
    secret,
    uri: totp.toString(),
    currentOTP: totp.generate(),
    id: Math.random().toString(),
  }

  return newTotp
}

export const TotpPage = (): JSX.Element => {
  const [, copy] = useCopyToClipboard()
  const [isAddFormVisible, setAddFormVisible] = useState(false)
  const [isQrScannerVisible, setQrScannerVisible] = useState(false)

  const [items, setItems] = useState<Totp[]>([])

  useEffect(() => {
    const storedTotp = JSON.parse(localStorage.getItem('totps') ?? '[]')
    setItems(storedTotp)
  }, [])

  const refreshTotps = (): void => {
    setItems(
      items.map(item => ({
        ...item,
        currentOTP: generateTotp({ label: item.label, secret: item.secret }).currentOTP,
      }))
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      refreshTotps()
    }, 3000)
    return () => clearInterval(interval)
  }, [items])

  useEffect(() => {
    localStorage.setItem('totps', JSON.stringify(items))
  }, [items])

  const addTotp = (label: string, secret: string): void => {
    const newTotp = generateTotp({ label, secret })

    setItems([...items, newTotp])
  }

  const exportToJSON = (items: Totp[]): void => {
    const dataToExport = JSON.stringify(items)
    const blob = new Blob([dataToExport], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'totps.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Function to import TOTP data from a JSON file
  const importFromJSON = (file: File): void => {
    const reader = new FileReader()
    reader.onload = event => {
      try {
        const importedData = JSON.parse((event as any).target.result as string)
        setItems(importedData)
      } catch (error) {
        console.error('Error parsing JSON file:', error)
      }
    }
    reader.readAsText(file)
  }

  const reorder = (list: Totp[], startIndex: number, endIndex: number): Totp[] => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return
    }

    const updated = reorder(items, result.source.index, result.destination.index)

    setItems(updated)
  }

  const removeTotp = (index: number): void => {
    const newTotp = [...items]
    newTotp.splice(index, 1)
    setItems(newTotp)
  }

  const handleExport = (): void => {
    exportToJSON(items)
  }

  const handleImport = (file: File): void => {
    if (file) {
      importFromJSON(file)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.headerContent}>
          <div className={styles.dropDownContainer}>
            <Dropdown
              button={
                <div className={styles.dropDownButton}>
                  <RoundButton icon={<Icons.AddCircle />} />
                </div>
              }
            >
              <DropdownItem
                onClick={() => {
                  setAddFormVisible(true)
                }}
              >
                Manual
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setQrScannerVisible(true)
                }}
              >
                Qr Code
              </DropdownItem>
            </Dropdown>
          </div>

          <div className={styles.dropDownContainer}>
            <Dropdown
              button={
                <div className={styles.dropDownButtonRight}>
                  <RoundButton icon={<Icons.Menu />} />
                </div>
              }
            >
              <DropdownItem onClick={handleExport}>Export TOTP Data</DropdownItem>
              <DropdownItem>
                <CustomFilePicker text="Import TOTP Data from file" onChange={handleImport} />
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        <Modal isVisible={isAddFormVisible} setVisible={setAddFormVisible}>
          <TOTPForm
            onSubmit={(label, secret) => {
              addTotp(label, secret)
              setAddFormVisible(false)
            }}
          />
        </Modal>

        <Modal isVisible={isQrScannerVisible} setVisible={setQrScannerVisible}>
          <QRCodeScanner
            onSubmit={(label, secret) => {
              addTotp(label, secret)
              setQrScannerVisible(false)
            }}
          />
        </Modal>

        <div className={styles.listContainer}>
          {!items?.length && (
            <div className={styles.emptyState}>
              <p>No TOTP added yet</p>
            </div>
          )}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((item: Totp, index: number) => (
                    <Draggable
                      key={item.label + index}
                      draggableId={item.label + index}
                      index={index}
                    >
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TotpItem item={item} copy={copy} remove={() => removeTotp(index)} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}
