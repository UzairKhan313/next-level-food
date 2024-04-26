import fs from 'fs'
import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'

const db = sql('meals.db')

export const getMeals = async () => {
  // it is not nesssccery to wait for 5000 sec i use just it here that we can also aync  and await here.
  await new Promise((reslove) => setInterval(reslove, 2000))

  //   throw new Error('Laoding Meals faild.')
  return db.prepare('SELECT * FROM MEALS').all()
}
export const getMealDetails = (slug) => {
  return db.prepare('SELECT * FROM MEALS WHERE slug =?').get(slug)
}

export const saveMeal = async (meal) => {
  meal.slug = slugify(meal.title, { lower: true })
  meal.instructions = xss(meal.instructions)

  const extension = meal.image.name.split('.').pop()
  const fileName = `${meal.slug}.${extension}`

  const stream = fs.createWriteStream(`public/images/${fileName}`)
  // we should convert the image to array buffer
  const bufferImage = await meal.image.arrayBuffer()

  // write take two argument is regular buffer  and callback
  stream.write(Buffer.from(bufferImage), (error) => {
    if (error) {
      console.log(error)
      throw new Error('Saving image faild please try again letter.')
    }
  })
  // Storing the path of image into the data base not the exact path by removing public beacouse it is also awailable at the root level
  meal.image = `/images/${fileName}`

  db.prepare(
    `
  INSERT INTO meals 
  (title, summary, instructions, creator, creator_email, image, slug) 
  VALUES (
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
    @slug
  )`
  ).run(meal)
}
