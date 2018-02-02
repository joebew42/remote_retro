import stageConfigs from "../configs/stage_configs"

export const actions = {
  updateStage: newStage => ({
    type: "UPDATE_STAGE",
    stage: newStage,
    stageConfigs,
  }),

  setInitialState: initialState => ({
    type: "SET_INITIAL_STATE",
    initialState,
  }),
}
