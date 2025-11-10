import { OrderClient } from './OrderClient'

export function generateStaticParams() {
  return [{ id: ['1'] }]
}

export default function OrderPage() {
  return <OrderClient />
}
