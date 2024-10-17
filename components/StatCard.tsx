import clsx from 'clsx'
import React from 'react'

interface StatCardProps {
  type:  'appointments' | 'pending' | 'cancelled'
  count: number 
  label: string
  icon: string
}

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div className={clsx('stat-card')}>
      
    </div>
  )
}

export default StatCard
