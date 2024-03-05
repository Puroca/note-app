import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import React from 'react'
import AuthCardFooter from '@/app/auth/AuthCardFooter'

interface CardItems {
  children: React.ReactNode
  cardTitle: string
  description: string
  cardFooterText: string
  cardFooterLinkText: string
  cardFooterLinkHref: string
}

const AunthCard = ({
  cardTitle,
  description,
  children,
  cardFooterText,
  cardFooterLinkText,
  cardFooterLinkHref
}: CardItems) => {
  return (
    <Card className="bg-slate-50 w-[400px] rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-center">{cardTitle}</CardTitle>
        <CardDescription className='text-center'>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <AuthCardFooter text={cardFooterText} linkText={cardFooterLinkText} linkHref={cardFooterLinkHref} />
      </CardFooter>
    </Card>
  )
}

export default AunthCard
