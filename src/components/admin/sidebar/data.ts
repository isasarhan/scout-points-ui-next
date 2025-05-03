export const generateSidebar = (pathName: string) => {
    return {
        navMain: [
            {
                title: "Users",
                url: "#",
                items: [
                    {
                        title: "All Users",
                        url: "/admin/users",
                        isActive: pathName === "/admin/users"
                    },
                    {
                        title: "Add New User",
                        url: "/admin/users/add",
                        isActive: pathName === "/admin/users/add"
                    },

                ],
            },
            {
                title: "Events",
                url: "#",
                items: [
                    {
                        title: "All Events",
                        url: "/admin/events",
                        isActive: pathName === "/admin/events"
                    },
                    {
                        title: "Add New Event",
                        url: "/admin/events/add",
                        isActive: pathName === "/admin/events/add"
                    },
                    {
                        title: "Take Attendence",
                        url: "/admin/events/attendence",
                        isActive: pathName === "/admin/events/attendence"
                    },
                ],
            },
            {
                title: "Departments",
                url: "#",
                items: [
                    {
                        title: "All Departments",
                        url: "/admin/departments",
                        isActive: pathName === "/admin/departments"
                    },
                    {
                        title: "Add New Department",
                        url: "/admin/departments/add",
                        isActive: pathName === "/admin/departments/add"
                    },
                ],
            },
            {
                title: "Associations",
                url: "#",
                items: [
                    {
                        title: "All Associations",
                        url: "/admin/associations",
                        isActive: pathName === "/admin/associations"
                    },
                    {
                        title: "Add New Associations",
                        url: "/admin/associations/add",
                        isActive: pathName === "/admin/associations/add"
                    },
                ],
            },
            {
                title: "Achievements",
                url: "#",
                items: [
                    {
                        title: "All Achievements",
                        url: "/admin/achievements",
                        isActive: pathName === "/admin/achievements"
                    },
                    {
                        title: "Add New Achievement",
                        url: "/admin/achievements/add",
                        isActive: pathName === "/admin/achievements/add"
                    },
                    {
                        title: "Categories",
                        url: "/admin/achievements/categories",
                        isActive: pathName === "/admin/achievements/categories"
                    },
                    {
                        title: "Achievement Requests",
                        url: "/admin/achievement-requests",
                        isActive: pathName === "/admin/achievement-requests"
                    },
                ],
            },
        ],
    }
}