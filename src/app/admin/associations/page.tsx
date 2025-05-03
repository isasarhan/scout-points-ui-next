import { getAuth } from '@/lib/auth'
import AssociationsModule from '@/modules/admin/associations'
import useAssociations from '@/services/associations'
import { FC } from 'react'
import { AlertTriangle } from 'lucide-react'

const AssociationsPage: FC = async () => {
  const { token } = await getAuth()
  const { getAll } = useAssociations({ token })
  const data = await getAll()

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-yellow-500" />
        <h2 className="text-2xl font-semibold">No Associations Found</h2>
        <p className="text-muted-foreground max-w-md">
          It looks like there are no associations available at the moment. Please check back later or try refreshing the page.
        </p>
      </div>
    )
  }

  return <AssociationsModule associations={data} />
}

export default AssociationsPage
