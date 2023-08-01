'use client'
import { useMemo } from 'react'
import { useModal as useConnectKitModal } from 'connectkit'
import { useAccount } from 'wagmi'

// For disconnected user, override button behavior to open connect modal
// + fallback to original button behavior if user is connected
export const useAuthBoundButton = (
  onClickAction: (() => void) | undefined
): (() => void) | undefined => {
  const { setOpen } = useConnectKitModal()

  const { address } = useAccount()
  const buttonBehavior = useMemo(
    () => (!address ? () => setOpen(true) : onClickAction),
    [address, setOpen, onClickAction]
  )
  return buttonBehavior
}
