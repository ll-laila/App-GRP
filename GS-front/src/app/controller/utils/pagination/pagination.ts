export class Pagination< T> {
  data: Array< T> = []
  page: number = 0
  size: number = 10
  totalElements!: number
  totalPages!: number
  first!: boolean
  last!: boolean
}

export const paginationSizes = [5, 10, 20, 25]

export const generatePageNumbers = (pagination: Pagination< any>): number[] => {
  const currentPage = pagination.page;
  const totalPages = pagination.totalPages;
  const visiblePages = 5;
  const pagesToShow = Math.min(visiblePages, totalPages);

  let startPage: number, endPage: number;
  if (totalPages <= visiblePages) {
    // Less than or equal to visible pages, show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // More than visible pages, calculate start and end pages based on current page
    const halfVisiblePages = Math.floor(visiblePages / 2);
    if (currentPage <= halfVisiblePages) {
      startPage = 1;
      endPage = visiblePages;
    } else if (currentPage + halfVisiblePages >= totalPages) {
      startPage = totalPages - visiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfVisiblePages;
      endPage = currentPage + halfVisiblePages;
    }
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}

