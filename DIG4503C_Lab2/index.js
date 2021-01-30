import Fetch from './Fetch.js'

const validFetch = new Fetch(1, '#6BEB34')
validFetch.fetch()

const invalidFetch = new Fetch(-1, '#992BD9')
invalidFetch.fetch()


