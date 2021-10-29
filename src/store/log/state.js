import { cns } from 'boot/cns'

export default function () {
  return {
    loading: false,
    data: {
      total_count: 0,
      results: [],
    },
    params: {
      page: 0,
      page_size: cns.DefaultPageSize,
    },
    filter: {},
    reload: false,
  }
}
