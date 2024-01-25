import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'

import { Link, createSearchParams } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const purchaseTabs = [
  {
    status: purchasesStatus.all,
    name: 'Tất cả'
  },
  {
    status: purchasesStatus.waitForConfirmation,
    name: 'Chờ xác nhận'
  },
  {
    status: purchasesStatus.waitForGetting,
    name: 'Chờ lấy hàng'
  },
  {
    status: purchasesStatus.inProgress,
    name: 'Đang giao'
  },
  {
    status: purchasesStatus.delivered,
    name: 'Đã giao'
  },
  {
    status: purchasesStatus.cancelled,
    name: 'Đã huỷ'
  }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })

  const purchasesInCart = purchasesInCartData?.data.data
  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
      key={tab.name}
    >
      {tab.name}
    </Link>
  ))
  return (
    <div className='overflow-x-auto'>
      <div className='min-w-[700px]'>
        <div>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {purchasesInCart?.map((purchase) => (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  className='flex'
                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                >
                  <div className='flex-shrink-0'>
                    <img className='h-20 w-20 object-cover' src={purchase.product.image} alt={purchase.product.name} />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>{purchase.buy_count}</div>
                    <div className='ml-3 flex-shrink-0'>
                      <span className='truncate text-gray-500 line-through'>
                        đ{formatCurrency(purchase.product.price_before_discount)}
                      </span>
                      <span className='ml-2 truncate text-orange'>đ{formatCurrency(purchase.product.price)}</span>
                    </div>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className='ml-4 text-xl text-orange'>
                      đ{formatCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
