import axios from 'axios'
import chalk from 'chalk'

export default class Fetch
{
    constructor(pokemon, color)
    {
        this.pokemon = pokemon
        this.color = color
    }

    fetch()
    {
        const rootEndpoint = 'https://pokeapi.co/api/v2/pokemon'
        return axios.get(`${rootEndpoint}/${this.pokemon}`)
            .then(response =>
            {
                const name = response.data.name
                const coloredStr = chalk.hex(this.color)(`name: ${name}, pokemon: ${this.pokemon}`)
                console.log(coloredStr)
            })
            .catch(err =>
            {
                const coloredStr = chalk.red(`Invalid Pokemon ID: ${this.pokemon}`)
                console.log(coloredStr)
            })
    }
}