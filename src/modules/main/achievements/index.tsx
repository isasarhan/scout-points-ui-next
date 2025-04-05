'use client'
import AchievementCard from '@/components/achievement-card';
import Dropdown from '@/components/dropdown';
import SearchInput from '@/components/search-input';
import { IAchievement } from '@/types/achievement';
import { IAchievemntCategory } from '@/types/achievemntCategory';
import React, { FC, useState } from 'react';

export interface AchievementsModuleProps {
    achievemnts: IAchievement[]
    categories: IAchievemntCategory[]
}

const AchievementsModule: FC<AchievementsModuleProps> = ({ achievemnts,categories }) => {
    const [category, setCategory] = useState('')
    const handleApplyForAchievement = (achievement: any) => { }
    const handleCategoryChange = (category:string)=>{

    }
    return (
        <>
            <div className='flex gap-3 pb-7'>
                <SearchInput />
                <div className="flex gap-2">
                    <Dropdown options={categories} handleDropdownChange={handleCategoryChange}/>
                </div>
            </div >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievemnts && achievemnts.map(achievement => (
                    <AchievementCard
                        key={achievement._id}
                        achievement={achievement}
                        // isCompleted={true}
                        onApply={() => handleApplyForAchievement(achievement)}
                    />
                ))}
            </div>
        </>
    );
};

export default AchievementsModule;