import sql from 'better-sqlite3'

const db = sql('meals.db')

export const getMeals = async () => {
  // it is not nesssccery to wait for 5000 sec i use just it here that we can also aync  and await here.
  await new Promise((reslove) => setInterval(reslove, 5000))

  //   throw new Error('Laoding Meals faild.')
  return db.prepare('SELECT * FROM MEALS').all()
}
