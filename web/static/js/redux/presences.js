import minBy from "lodash/minBy"
import values from "lodash/values"
import reject from "lodash/reject"

export const actions = {
  setPresences: presences => ({
    type: "SET_PRESENCES",
    presences,
  }),

  updatePresence: (presenceToken, newAttributes) => ({
    type: "UPDATE_PRESENCE",
    presenceToken,
    newAttributes,
  }),

  syncPresenceDiff: presenceDiff => ({
    type: "SYNC_PRESENCE_DIFF",
    presenceDiff,
  }),
}

const assignFacilitatorToLongestTenured = presences => {
  const facilitator = minBy(presences, "online_at")
  return presences.map(presence => ({
    ...presence, is_facilitator: facilitator.token === presence.token,
  }))
}

const addArrivals = (existingUsers, arrivals) => {
  const presencesInArrivals = values(arrivals).map(join => join.user)
  const newUsers = presencesInArrivals.filter(presence =>
    !existingUsers.find(u => presence.token === u.token)
  )

  return [...existingUsers, ...newUsers]
}

const removeDepartures = (presences, departures) => {
  const departureTokens = Object.keys(departures)
  return reject(presences, presence => departureTokens.includes(presence.token))
}

export const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PRESENCES":
      return assignFacilitatorToLongestTenured(action.presences)
    case "SYNC_PRESENCE_DIFF": {
      const { presenceDiff: { joins, leaves } } = action
      const withArrivalsAdded = addArrivals(state, joins)
      const withDeparturesRemoved = removeDepartures(withArrivalsAdded, leaves)
      return assignFacilitatorToLongestTenured(withDeparturesRemoved)
    }
    case "UPDATE_PRESENCE": {
      const { presenceToken, newAttributes } = action
      return state.map(presence => (
        presence.token === presenceToken ? { ...presence, ...newAttributes } : presence)
      )
    }
    default:
      return state
  }
}

export default reducer
