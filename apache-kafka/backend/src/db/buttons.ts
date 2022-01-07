import knex from './knex'

import { ButtonPress, Color, ColorCounts } from '../../../sharedTypes'


const insert = async ({ id, color, timestamp }: ButtonPress) => {
    const response = await knex('buttons').insert({
        id,
        color,
        timestamp
    })
        .onConflict('id')
        .ignore()
    return response
}

type SelectAllRow = {
    color: Color
    'count(*)': number
}

const selectAll = async () => {
    const EMPTY_COLORS = { red: 0, green: 0, blue: 0 }

    const response = await knex.raw(`select color, count(*) from buttons group by color`)
    console.log('response', response)

    const colorCounts = { red: 0, green: 0, blue: 0 }

    response.forEach((row: SelectAllRow) => colorCounts[row.color] = row['count(*)'])
    
    return colorCounts
}

export default {
    insert,
    selectAll
}