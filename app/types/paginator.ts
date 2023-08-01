export type Paginator = {
  isLoadingMore: boolean
  hasMoreTokens: boolean
  handleLoadMore?: () => void
  pageKey?: string
}
