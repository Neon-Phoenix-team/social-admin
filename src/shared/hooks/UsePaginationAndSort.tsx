import { useState } from 'react'
import { SortConfigType, SortDirection } from '@/shared/api/types'
import SortAsc from '@/shared/assets/icons/common/SortAsc'
import SortDesc from '@/shared/assets/icons/common/SortDesc'
import Filter from '@/shared/assets/icons/common/Filter'

export const usePaginationAndSort = () => {
  const [page, setPage] = useState(1)
  const [itemsCountForPage, setItemsCountForPage] = useState(8)
  const [sortConfig, setSortConfig] = useState<SortConfigType>(
    { sortBy: 'createdAt', sortDirection: SortDirection.Desc })

  const onChangePagination = (args: { page: number; count: number }) => {
    setPage(args.page)
    setItemsCountForPage(args.count)
  }

  const getSortIcon = (columnName: string) => {
    if (sortConfig.sortBy === columnName) {
      if (sortConfig.sortDirection === SortDirection.Asc) {
        return <SortAsc />
      } else {
        return <SortDesc />
      }
    }
    return <Filter />
  }


  const handleSort = (columnName: string) => {
    setSortConfig(prevConfig => {
      if (prevConfig.sortBy === columnName) {
        return {
          sortBy: columnName,
          sortDirection: prevConfig.sortDirection === SortDirection.Asc
            ? SortDirection.Desc
            : SortDirection.Asc,
        }
      }
      return { sortBy: columnName, sortDirection: SortDirection.Asc }
    })
  }

  return {page, itemsCountForPage, onChangePagination, getSortIcon, handleSort, sortConfig}
}