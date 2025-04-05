'use client'
import { IAchievement } from '@/types/achievement';
import React, { FC, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Button } from '../ui/button';
import { getLevelColor } from '@/lib/utils';
export interface AchievementCardProps {
    achievement: IAchievement;
    isCompleted?: boolean;
    isPending?: boolean;
    onApply?: () => void;
}
const AchievementCard: FC<AchievementCardProps> = ({ achievement, isCompleted = false, isPending = false, onApply }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className={`overflow-hidden transition-all duration-300 h-full flex flex-col ${isCompleted
                ? 'border-green-300 dark:border-green-800 bg-green-50/40 dark:bg-green-950/20'
                : isPending
                    ? 'border-yellow-300 dark:border-yellow-800 bg-yellow-50/40 dark:bg-yellow-950/20'
                    : 'hover:shadow-md hover:translate-y-[-4px]'
            }`}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg sm:text-xl font-bold flex gap-2 items-center">
                            {achievement.title}
                            {isCompleted && (
                                <Check className="h-5 w-5 text-green-500" />
                            )}
                        </CardTitle>
                        <CardDescription className="mt-1">
                            {achievement.description}
                        </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className={`${getLevelColor(achievement.level)}`}>
                            {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                        </Badge>
                        <Badge className="bg-scout-pine">
                            {achievement.points} points
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-0 flex-grow">
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Requirements</h4>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                                {isOpen ?
                                    <ChevronUp className="h-4 w-4" /> :
                                    <ChevronDown className="h-4 w-4" />
                                }
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="mt-2">
                        <ul className="text-sm space-y-2">
                            {achievement.requirements && achievement.requirements.map((req, index) => (
                                <li key={index} className="flex gap-2">
                                    <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-1 rounded-full bg-muted text-xs font-medium">
                                        {index + 1}
                                    </span>
                                    <span>{req}</span>
                                </li>
                            ))}
                        </ul>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
            <CardFooter className="pt-4">
                {!isCompleted && !isPending && onApply && (
                    <Button
                        onClick={onApply}
                        className="w-full bg-scout-pine hover:bg-scout-pine/90"
                    >
                        Apply for Achievement
                    </Button>
                )}
                {isPending && (
                    <Button
                        variant="outline"
                        className="w-full border-yellow-400 text-yellow-700 dark:text-yellow-400"
                        disabled
                    >
                        Pending Approval
                    </Button>
                )}
                {isCompleted && (
                    <Button
                        variant="outline"
                        className="w-full border-green-400 text-green-700 dark:text-green-400"
                        disabled
                    >
                        Completed
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default AchievementCard;