'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { createReview } from '@/app/utils/apis/review'
import { fullProduct } from '@/app/interface'

const FormSchema = z.object({
  content: z
    .string()
    .min(10, {
      message: 'Bio must be at least 5 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
})

interface Props {
  user: any
  product: fullProduct
}

export default function CommentForm({ user, product }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const reviewData = await createReview(
        data.content,
        5,
        user.id,
        product._id,
      )
      toast({
        title: 'Review submitted successfully',
      })
    } catch (error: any) {
      toast({
        title: 'Error submitting review',
        description: error.message,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Reviews</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
