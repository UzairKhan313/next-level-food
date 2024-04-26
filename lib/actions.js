'use server'

import { redirect } from 'next/navigation'
import { saveMeal } from './meals'
import { revalidatePath } from 'next/cache'

const inValidText = (text) => {
  return !text || text.trim()
}

export const shareMeal = async (prevState, formData) => {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  }
  if (
    inValidText(meal.title) ||
    inValidText(meal.summary) ||
    inValidText(meal.instructions) ||
    inValidText(meal.creator) ||
    inValidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input',
    }
  }
  await saveMeal(meal)
  revalidatePath('/meals')
  redirect('/meals')
}
