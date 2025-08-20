import { StarIcon } from 'lucide-react';
import type { FC } from 'react';

interface RatingProps {
    rating?: number
    size?: 'sm' | 'md' | 'lg'
}

const Rating: FC<RatingProps> = ({ rating=0, size = 'md' }) => {
    const dimensions = size === 'md' ? 'w-6 h-6' : size === 'sm' ? 'w-4 h-4' : 'w-8 h-8'
    return (
        <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={`rating-${star}`} className={`${dimensions}
                    ${rating >= star ? "fill-yellow-400 text-yellow-400" :
                        "fill-slate-200 text-slate-200"}`} />
            ))}
        </div>
    );
}

export default Rating;
