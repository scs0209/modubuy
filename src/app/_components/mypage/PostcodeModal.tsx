'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import DaumPostcode from 'react-daum-postcode'
import { UseFormSetValue } from 'react-hook-form'

type Inputs = {
  address: string
  name: string
  email: string
  detail_address: string
}
interface Props {
  setValue: UseFormSetValue<any>
}

export function PostcodeModal({ setValue }: Props) {
  const handleComplete = (data: any) => {
    let fullAddress = `(${data.zonecode}) ` // 우편번호를 주소 앞에 추가
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` ${extraAddress}` : ''
    }

    fullAddress += ` ${data.address}`
    setValue('address', fullAddress)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">address search</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Address Search</DialogTitle>
          </DialogHeader>
          <DaumPostcode onComplete={handleComplete} />
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
