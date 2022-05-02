export function setLoading (state, v) {
  state.loading = v
}

export function setData (state, v) {
  state.data.total_count = v?.total_count || 0
  state.data.results = v?.results || []
}

export function setSelectedMsg (state, v) {
  if (state.selectedMsg && v?.id === state.selectedMsg.id) {
    v = null
  }
  state.selectedMsg = v
}

export function setSelectedMsgExpanded (state, v) {
  state.selectedMsgExpanded = v
}

export function toggleSelectedMsgExpanded (state) {
  state.selectedMsgExpanded = !state.selectedMsgExpanded
}

export function setReload (state, v) {
  state.reload = !!v
}

export function setPage (state, v) {
  state.params.page = v || 0
}

export function setPageSize (state, v) {
  state.params.page_size = v
}

export function setLevel (state, v) {
  state.level = v
}

export function setSearch (state, v) {
  state.search = v || ''
}

export function setTsGte (state, v) {
  state.ts_gte = v
}

export function setTsLte (state, v) {
  state.ts_lte = v
}

export function setPeriodType (state, v) {
  state.period_type = v
}

export function setArDur (state, v) {
  state.ar_dur = v
}
