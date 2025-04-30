'use client'
import AchievementCard from '@/components/achievement-card';
import Dropdown from '@/components/dropdown';
import SearchInput from '@/components/search-input';
import { IAchievement, IAchievementRequest, Status } from '@/types/achievement';
import { IAchievemntCategory } from '@/types/achievemntCategory';
import React, { FC, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Check, Clock } from 'lucide-react';
import { useUserContext } from '@/providers/UserProvider';
import useAchievementRequests from '@/services/achievementsRequests';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export interface AchievementsModuleProps {
    achievemnts: IAchievement[]
    categories: IAchievemntCategory[]
    requests: IAchievementRequest[]
}

const AchievementsModule: FC<AchievementsModuleProps> = ({ achievemnts, categories, requests }) => {
    const { user, token } = useUserContext()
    const { add } = useAchievementRequests({ token: token })
    const router = useRouter()
    const [category, setCategory] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('available');
    const [completedList, setCompletedList] = useState<IAchievement[]>(achievemnts.filter((achievemnt) =>
        requests.some((req) => req.achievement === achievemnt._id && req.status === Status.Complete)
    ));
    const [pendingList, setPendingList] = useState<IAchievement[]>(achievemnts.filter((achievemnt) =>
        requests.some((req) => req.achievement === achievemnt._id && req.status === Status.Pending)
    ));
    const [availableList, setAvailableList] = useState<IAchievement[]>(achievemnts.filter((achievemnt) =>
        !requests.some((req) => req.achievement === achievemnt._id)
    ));

    const handleRequestAchievement = async (id: string) => {
        await add({ achievement: id, user: user?._id!, status: Status.Pending }).then(()=>{
            toast.success("Achievement Added!")
            router.refresh()
        })
    }

    const filterAchievements = (achievementList: IAchievement[]) => {
        return achievementList.filter(achievement => {
            const matchesSearch =
                achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                achievement.description.toLowerCase().includes(searchTerm.toLowerCase());

            //   const matchesCategory = 
            //     categoryFilter === 'all' || achievement.categories.includes === categoryFilter;

            //   const matchesLevel = 
            //     levelFilter === 'all' || achievement.level === levelFilter;

            //   return matchesSearch && matchesCategory && matchesLevel;
            return matchesSearch;
        });
    };

    const filteredCompleted = filterAchievements(completedList);
    const filteredPending = filterAchievements(pendingList);
    const filteredAvailable = filterAchievements(availableList);

    const handleApplyForAchievement = (achievement: any) => { }
    const handleCategoryChange = (category: string) => {

    }
    console.log('categories', categories);

    return (
        <>
            <div className='flex gap-3 pb-7'>
                <SearchInput />
                <div className="flex gap-2">
                    <Dropdown options={categories} handleDropdownChange={handleCategoryChange} />
                </div>
            </div >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-8 w-full max-w-md mx-auto">
                    <TabsTrigger value="available" className="flex-1">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="h-6 w-6 p-1 flex items-center justify-center rounded-full">
                                {filteredAvailable.length}
                            </Badge>
                            Available
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="flex-1">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="h-6 w-6 p-1 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                {filteredPending.length}
                            </Badge>
                            Pending
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="flex-1">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="h-6 w-6 p-1 flex items-center justify-center rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                {filteredCompleted.length}
                            </Badge>
                            Completed
                        </div>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="available" className="space-y-8 animate-fade-in">
                    {/* {filteredAvailable.length === 0 && (
                        <div className="text-center py-12">
                            <div className="bg-muted w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                                <Search className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">No achievements found</h3>
                            <p className="text-muted-foreground">
                                {searchTerm || categoryFilter !== 'all' || levelFilter !== 'all'
                                    ? "Try adjusting your filters to see more achievements."
                                    : "You've applied for all available achievements!"}
                            </p>
                        </div>
                    )} */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAvailable.map(achievement => (
                            <AchievementCard
                                key={achievement._id}
                                achievement={achievement}
                                onApply={() => handleRequestAchievement(achievement._id!)}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="pending" className="space-y-8 animate-fade-in">
                    {filteredPending.length === 0 && (
                        <div className="text-center py-12">
                            <div className="bg-muted w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                                <Clock className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">No pending achievements</h3>
                            <p className="text-muted-foreground">
                                {/* {searchTerm || categoryFilter !== 'all' || levelFilter !== 'all' */}
                                {searchTerm
                                    ? "Try adjusting your filters to see more achievements."
                                    : "You don't have any achievements pending approval."}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPending.map(achievement => (
                            <AchievementCard
                                key={achievement._id}
                                achievement={achievement}
                                isPending={true}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="completed" className="space-y-8 animate-fade-in">
                    {filteredCompleted.length === 0 && (
                        <div className="text-center py-12">
                            <div className="bg-muted w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                                <Check className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">No completed achievements</h3>
                            <p className="text-muted-foreground">
                                {searchTerm
                                    ? "Try adjusting your filters to see more achievements."
                                    : "You haven't completed any achievements yet."}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCompleted.map(achievement => (
                            <AchievementCard
                                key={achievement._id}
                                achievement={achievement}
                                isCompleted={true}
                            />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
};

export default AchievementsModule;