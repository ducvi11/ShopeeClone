interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

export default function Pagination({ page, pageSize, setPage }: Props) {
  const renderPagination = () => {
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        return (
          <button
            key={index}
            className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer'
          >
            {pageNumber}
          </button>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer'>
        Prev
      </button>
      {renderPagination()}
      <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer'>
        Next
      </button>
    </div>
  )
}
