import { getAuth } from '@/lib/auth'
import AssociationsModule from '@/modules/admin/associations'
import useAssociations from '@/services/associations'
import { FC } from 'react'
import { AlertTriangle } from 'lucide-react'
import NotFound from '@/components/not-found'

const AssociationsPage: FC = async () => {
  const { token } = await getAuth()
  const { getAll } = useAssociations({ token })
  const data = await getAll()

  if (data.length === 0) {
    return (
      <NotFound
        title='No Associations Found'
        description='It looks like there are no associations available at the moment. Please check back later or try refreshing the page.' />
    )
  }

  return <AssociationsModule associations={data} />
}

export default AssociationsPage
