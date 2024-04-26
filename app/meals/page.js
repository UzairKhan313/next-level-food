import { Suspense } from 'react'
import Link from 'next/link'

import classes from './page.module.css'
import MealsGrid from '@/components/meals/MealsGrid'
import { getMeals } from '@/lib/meals'

export const metadata = {
  title: 'All meals ',
  description: 'Browse the delicious meals, shared by our vibrant community.',
}

const Meals = async () => {
  const meals = await getMeals()
  return <MealsGrid meals={meals} />
}

// Server compenent can be async.
const MealsPage = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Deliciouse meals created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it your self. It is easy and fun.
        </p>
        <p className={classes.cta}>
          <Link href={'/meals/share'}>Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  )
}

export default MealsPage
