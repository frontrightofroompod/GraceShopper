import axios from 'axios'

const initialState = []

//ACTION NAMES
const SET_BEERS = 'SET_BEERS'
const REMOVE_BEER = 'REMOVE_BEER'
//ACTION CREATORS

export const setBeers = beers => {
  return {type: SET_BEERS, beers}
}

export const removeBeer = id => {
  return {
    type: REMOVE_BEER,
    id
  }
}
//THUNKS

export const fetchBeers = (search = '') => {
  return async function(dispatch) {
    let response
    if (search) {
      response = await axios.get(`/api/beers/search?${search}`)
    } else {
      response = await axios.get('/api/beers')
    }
    const beers = response.data
    dispatch(setBeers(beers))
  }
}

export const removeBeerFromServer = beerId => {
  return async dispatch => {
    await axios.delete(`/api/beers/${beerId}`)
    dispatch(removeBeer(beerId))
  }
}

export const beers = (state = initialState, action) => {
  switch (action.type) {
    case SET_BEERS:
      return action.beers
    case REMOVE_BEER:
      return state.filter(beer => beer.id !== action.id)
    default:
      return state
  }
}
