'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { createReview } from '@/app/_utils/apis/review'
import { fullProduct } from '@/app/interface'
import { Textarea } from '@/components/ui/textarea'
import { TReviewFormSchema, reviewFormSchema } from '@/lib/types'
import FormFieldComponent from '../FormFieldComponent'

interface Props {
  user: any
  product: fullProduct
}

export default function ReviewForm({ user, product }: Props) {
  const form = useForm<TReviewFormSchema>({
    resolver: zodResolver(reviewFormSchema),
  })

  async function onSubmit(data: TReviewFormSchema) {
    try {
      const reviewData = await createReview(
        data.content,
        data.rate,
        user.id,
        product._id,
      )
      toast({
        title: 'Review submitted successfully',
      })
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: 'Login Please',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormFieldComponent<TReviewFormSchema>
          form={form}
          name="content"
          label="Reviews"
          description="Your review will be helpful to other buyers"
          placeholder="Please, write your review."
          component={Textarea}
        />
        <FormField
          control={form.control}
          name="rate"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${
                          star <= field.value
                            ? 'text-yellow-300'
                            : 'text-gray-300'
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => {
                          form.setValue('rate', star)
                        }}
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
