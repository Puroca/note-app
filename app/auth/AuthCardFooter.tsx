import Link from "next/link"

interface CardFooterProps {
  linkHref: string
  text: string
  linkText: string
}

const AuthCardFooter = ({ linkHref, text, linkText }: CardFooterProps) => {
  return (
    <div className=" text-slate-600 text-center w-full">
      <p>
        {' '}
        {text}{' '}
        <span>
          {' '}
          <Link
            href={linkHref}
            className="text-orange-500 underline hover:text-slate-600"
          >
            {' '}
            {linkText}{' '}
          </Link>{' '}
        </span>{' '}
      </p>
    </div>
  )
}

export default AuthCardFooter;