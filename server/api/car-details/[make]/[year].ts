import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const { make, year } = event.context.params
  try {
    const res = await $fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${make}&year=${year}`, {
      method: 'GET'
    })
    return res
  } catch (err) {
    return { error: 'Cannot fetch data from CarQuery API', details: err.message }
  }
})
