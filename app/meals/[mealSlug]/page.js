import Image from 'next/image'
import classes from './page.module.css'
import { getMealDetails } from '@/lib/meals'
import { notFound } from 'next/navigation'

const MealDetailsPage = ({ params }) => {
  // Every page component have that param props which is object.
  const { mealSlug } = params
  const meal = getMealDetails(mealSlug)

  if (!meal) {
    // Calling the closest not found page the this component which can be done with speciel functions.
    // not found will stop the excution of this component and call the closest not found or error page.
    notFound()
  }
  //replacing line break in instruction string with br tags.
  meal.instructions = meal.instructions.replace(/\n/g, '<br />')
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary} SUMMERY>
            {meal.summary}
          </p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  )
}

export default MealDetailsPage
