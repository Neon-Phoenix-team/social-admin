'use client'

import { SelectBox } from '@/shared/ui/Select/SelectBox'
import { Input } from '@/shared/ui/Input/Input'
import s from '@/shared/ui/DropDown/Dropdown.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import CardRadix from '@/shared/ui/CardRadix/CardRadix'
import { useBanToggle } from '@/shared/hooks/useBanToggle'
import { useState } from 'react'
import { modalType } from '@/shared/ui/DropDown/DropDown'
import { useRemoveUser } from '@/shared/hooks/useRemoveUser'

const banOptions = [{ id: 'bad', value: 'Bad behavior' }, {
  id: 'adver',
  value: 'Advertising placement',
}, { id: 'another', value: 'Another reason' }]

type Props = {
  modalType: modalType,
  onClose: (modalType: modalType) => void,
  userId: number,
  isBan: boolean,
  userName: string,
};

export const ActionModal = ({ modalType, onClose, userId, isBan, userName }: Props) => {
  const { handleBanToggle } = useBanToggle()
  const [removeUser] = useRemoveUser(userId)

  const [reason, setReason] = useState<string>('')
  const [customReason, setCustomReason] = useState<string>('')

  const handleCloseModal = () => {
    onClose(null)
  }

  const onBanUser = () => {
    const finalReason = reason === 'Another reason' ? customReason : reason
    console.log(userId, isBan, finalReason)
    onClose(null)
    setReason('')
    setCustomReason('')
    handleBanToggle(userId, isBan, finalReason)
  }

  const onDeleteUser = async () => {
    try {
      await removeUser({ variables: { userId } })
      onClose(null)
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const onConfirm = () => {
    if (modalType === 'ban' || modalType === 'unban') {
      onBanUser()
    }
    if (modalType === 'delete') {
      onDeleteUser()
    }
  }

  const title = modalType === 'delete' ? 'Delete user' : modalType === 'ban' ? 'Ban user' : 'Un-Ban user'

  const text = modalType === 'delete' ? 'to delete' : modalType === 'unban' ? 'want to un-ban' : ' to ban this'
  return (
    <CardRadix open={!!modalType} title={title} onOpenChange={handleCloseModal}>
      <p>Are you sure {text} user {userName}?</p>

      {modalType === 'ban' && (
        <>
          <SelectBox placeholder={'Reason for bun'} value={reason} onValueChange={setReason}
            options={banOptions}></SelectBox>
          {reason === 'Another reason' &&
            <Input className={s.input} onChangeText={setCustomReason} placeholder="Enter your reason" />}
        </>
      )}
      <div className={s.buttons}>
        <Button className={s.btn} onClick={handleCloseModal}>No</Button>
        <Button className={s.btn} variant={'outlined'} onClick={onConfirm}>Yes</Button>
      </div>
    </CardRadix>
  )
}