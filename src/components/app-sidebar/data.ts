export const generateSidebar = (pathName: string) => {
    return {
        navMain: [
            {
                title: "Users",
                url: "#",
                items: [
                    {
                        title: "All Users",
                        url: "/admin/dashboard/users",
                        isActive: pathName === "/admin/dashboard/users"
                    },
                    {
                        title: "Add New User",
                        url: "/admin/dashboard/users/add",
                        isActive: pathName === "/admin/dashboard/users/add"
                    },

                ],
            },
            {
                title: "Events",
                url: "#",
                items: [
                    {
                        title: "All Events",
                        url: "/admin/dashboard/events",
                        isActive: pathName === "/admin/dashboard/events"
                    },
                    {
                        title: "Add New Event",
                        url: "/admin/dashboard/events/add",
                        isActive: pathName === "/admin/dashboard/events/add"
                    },
                    {
                        title: "Take Attendence",
                        url: "/admin/dashboard/events/attendence",
                        isActive: pathName === "/admin/dashboard/events/attendence"
                    },
                ],
            },
            {
                title: "Departments",
                url: "#",
                items: [
                    {
                        title: "All Departments",
                        url: "/admin/dashboard/departments",
                        isActive: pathName === "/admin/dashboard/departments"
                    },
                    {
                        title: "Add New Department",
                        url: "/admin/dashboard/departments/add",
                        isActive: pathName === "/admin/dashboard/departments/add"
                    },
                ],
            },
            {
                title: "Achievements",
                url: "#",
                items: [
                    {
                        title: "All Achievements",
                        url: "/admin/dashboard/achievements",
                        isActive: pathName === "/admin/dashboard/achievements"
                    },
                    {
                        title: "Add New Achievement",
                        url: "/admin/dashboard/achievements/add",
                        isActive: pathName === "/admin/dashboard/achievements/add"
                    },
                    {
                        title: "Categories",
                        url: "/admin/dashboard/achievements/categories",
                        isActive: pathName === "/admin/dashboard/achievements/categories"
                    }
                ],
            },
        ],
    }
}