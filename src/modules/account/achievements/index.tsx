'use client'
import AchievementCard from '@/components/achievement-card';
import Dropdown from '@/components/dropdown';
import SearchInput from '@/components/search-input';
import { IAchievement, IAchievementRequest, Status } from '@/types/achievement';
import { IAchievemntCategory } from '@/types/achievemntCategory';
import React, { FC, useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Search } from 'lucide-react';
import { useUserContext } from '@/providers/UserProvider';
import useAchievementRequests from '@/services/achievementsRequests';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export interface AchievementsModuleProps {
    achievemnts: IAchievement[]
    categories: IAchievemntCategory[]
    requests: IAchievementRequest[]
}

enum EnumTabs {
    AVAILABLE = "available",
    PENDING = "pending",
    COMPLETED = "completed"
}

const AchievementsModule: FC<AchievementsModuleProps> = ({ achievemnts, categories, requests }) => {
    const { user, token } = useUserContext()
    const { add, remove } = useAchievementRequests({ token: token })
    const router = useRouter()
    const [category, setCategory] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('available');
    const [filteredList, setFilteredList] = useState<IAchievement[]>([])

    const completedList = achievemnts.filter((achievemnt) =>
        requests.some((req) => req.achievement._id === achievemnt._id && req.status === Status.Complete)
    )
    const pendingList = achievemnts.filter((achievemnt) =>
        requests.some((req) => req.achievement._id === achievemnt._id && req.status === Status.Pending)
    );
    const availableList = achievemnts.filter((achievemnt) =>
        !requests.some((req) => req.achievement._id === achievemnt._id)
    );

    const filterAchievements = (achievementList: IAchievement[], searchTerm: string = '') => {
        return achievementList.filter(achievement => {
            const matchesSearch =
                achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                achievement.description.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesSearch;
        });
    };
    const getTabList = (): IAchievement[] => {
        switch (activeTab) {
            case EnumTabs.PENDING:
                return pendingList
            case EnumTabs.COMPLETED:
                return completedList
            default :
                return availableList
        }
    }
    const filterAchievementList = () => {
        switch (activeTab) {
            case EnumTabs.AVAILABLE:
                return setFilteredList(filterAchievements(availableList))
            case EnumTabs.PENDING:
                return setFilteredList(filterAchievements(pendingList))
            case EnumTabs.COMPLETED:
                return setFilteredList(filterAchievements(completedList))
        }
    }
    useEffect(() => {
        filterAchievementList()
    }, [activeTab])

    const handleRequestAchievement = async (id: string) => {
        await add({ achievement: id, user: user?._id!, status: Status.Pending }).then(() => {
            toast.success("Achievement Added!")
            setFilteredList(filteredList.filter((item) => item._id !== id))
        }).finally(() => {
            router.refresh()
        })
    }

    const handleSearch = (query: string) => {

        switch (activeTab) {
            case EnumTabs.AVAILABLE:
                return setFilteredList(filterAchievements(availableList, query))
            case EnumTabs.PENDING:
                return setFilteredList(filterAchievements(pendingList, query))
            case EnumTabs.COMPLETED:
                return setFilteredList(filterAchievements(completedList, query))
        }
    }

    const handleDelete = async (id: string) => {
        const req = requests.find((req) => req.achievement._id === id)
        if (!req?._id) return
        await remove(req?._id).then(() => {
            router.refresh()
            toast.success('removed!')
            setFilteredList(filteredList.filter((item) => item._id !== id))
        })
    }
    const handleCategoryChange = (category: string) => {
        const list = getTabList()
        if (category !== "all")
            setFilteredList(list.filter((item) => item.categories.includes(category)))
        else
        filterAchievementList()
    }

    return (
        <>
            <div className='flex gap-3 pb-7'>
                <SearchInput handleSearch={handleSearch} />
                <div className="flex gap-2">
                    <Dropdown options={categories.map(cat=>{
                        return {
                            key: cat._id!,
                            label: cat.name!,
                            value: cat._id!
                        }
                    })} handleDropdownChange={handleCategoryChange} />
                </div>
            </div >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-8 w-full max-w-md mx-auto">
                    <TabsTrigger value={EnumTabs.AVAILABLE} className="flex-1">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="h-6 w-6 p-1 flex items-center justify-center rounded-full">
                                {availableList.length}
                            </Badge>
                            Available
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value={EnumTabs.PENDING} className="flex-1">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="h-6 w-6 p-1 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                {pendingList.length}
                            </Badge>
                            Pending
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value={EnumTabs.COMPLETED} className="flex-1">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="h-6 w-6 p-1 flex items-center justify-center rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                {completedList.length}
                            </Badge>
                            Completed
                        </div>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={EnumTabs.AVAILABLE} className="space-y-8 animate-fade-in">
                    {filteredList.length === 0 && (
                        <div className="text-center py-12">
                            <div className="bg-muted w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                                <Search className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">No achievements found</h3>
                            <p className="text-muted-foreground">
                                {searchTerm
                                    ? "Try adjusting your filters to see more achievements."
                                    : "You've applied for all available achievements!"}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredList.map(achievement => (
                            <AchievementCard
                                key={achievement._id}
                                achievement={achievement}
                                onApply={() => handleRequestAchievement(achievement._id!)}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value={EnumTabs.PENDING} className="space-y-8 animate-fade-in">
                    {filteredList.length === 0 && (
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
                        {filteredList.map(achievement => (
                            <AchievementCard
                                onDoubleClick={() => handleDelete(achievement._id!)}
                                key={achievement._id}
                                achievement={achievement}
                                isPending={true}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value={EnumTabs.COMPLETED} className="space-y-8 animate-fade-in">
                    {filteredList.length === 0 && (
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
                        {filteredList.map(achievement => (
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