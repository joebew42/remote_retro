import { createSelector } from "reselect"

const presencesSelector = state => state.presences

export const facilitatorName = createSelector(
  presencesSelector,
  presences => {
    const facilitator = presences.find(user => user.is_facilitator)
    return facilitator ? facilitator.name : null
  }
)
