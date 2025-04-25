export const generateSidebar = (pathName: string) => {
    return {
        navMain: [
            {
                title: "My Account",
                url: "/account",                
            },
            {
                title: "Achievements",
                url: "#",
                items: [
                    {
                        title: "All Achievements",
                        url: "/account/achievements",
                        isActive: pathName === "/admin/dashboard/achievements"
                    },
                ],
            },
        ],
    }
}