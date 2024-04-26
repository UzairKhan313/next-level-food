import Link from 'next/link'
import classes from './page.module.css'
import MealsGrid from '@/components/meals/MealsGrid'

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
        <MealsGrid meals={[]} />
      </main>
    </>
  )
}

export default MealsPage
