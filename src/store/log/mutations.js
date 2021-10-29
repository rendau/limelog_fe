export function setLoading (state, v) {
  state.loading = v
}

export function setData (state, v) {
  state.data.total_count = v?.total_count || 0
  state.data.results = v?.results || []
}

export function setReload (state, v) {
  state.reload = !!v
}

export function setPage (state, v) {
  state.params.page = v || 0
}

export function setPageSize (state, v) {
  state.params.page_size = v || 30
}

export function setFilter (state, v) {
  state.params.filter = v || {}
}
