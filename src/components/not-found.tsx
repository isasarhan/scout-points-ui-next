import { AlertTriangle } from 'lucide-react';
import type { FC } from 'react';

interface NotFoundProps {
    title: string
    description: string
}

const NotFound: FC<NotFoundProps> = ({ title , description}) => {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-yellow-500" />
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-muted-foreground max-w-md">
                {description}
            </p>
        </div>
    );
}

export default NotFound;
