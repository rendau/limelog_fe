export default function () {
  return {
    loading: false,
    data: {
      total_count: 0,
      results: [],
    },
    params: {
      page: 0,
      page_size: 30,
    },
    filter: {},
    reload: false,
  }
}
