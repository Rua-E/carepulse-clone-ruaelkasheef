import React from 'react'
import { Button } from './ui/button';

interface ButtonProps {
    isLoading: boolean,
    className?: string,
    children: React.ReactNode,
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <div>
      <Button type='submit' disabled={isLoading} className={className ?? 'shad-primary-btn w-full'} >
        {isLoading ? (
          <div className='flex items-center gap-4'></div>
        ): (children)}
      </Button>
    </div>
  )
}

export default SubmitButton;
