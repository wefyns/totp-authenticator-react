export interface Totp {
  id: string
  label: string
  currentOTP: string
  secret: string
  uri: string
}
