'use client'
import { useMemo } from 'react'
import { useModal as useConnectKitModal } from 'connectkit'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

// For disconnected user, override button behavior to open connect modal
// + fallback to original button behavior if user is connected
export const useAuthBoundButton = (
  onClickAction: (() => void) | undefined
): (() => void) | undefined => {
  const { openConnectModal } = useConnectModal()

  const { address } = useAccount()
  const buttonBehavior = useMemo(
    () => (!address ? () => openConnectModal && openConnectModal() : onClickAction),
    [address, openConnectModal, onClickAction]
  )
  return buttonBehavior
}
