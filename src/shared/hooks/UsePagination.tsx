import { useState } from 'react'

export const usePagination = () => {
  const [page, setPage] = useState(1)
  const [itemsCountForPage, setItemsCountForPage] = useState(8)

  const onChangePagination = (args: { page: number; count: number }) => {
    setPage(args.page)
    setItemsCountForPage(args.count)
  }

  return {page, itemsCountForPage, onChangePagination}
}