export const generateSidebar = (pathName: string) => {
    return {
        navMain: [
            {
                title: "Users",
                url: "#",
                items: [
                    {
                        title: "View All",
                        url: "/admin/dashboard/users",
                        isActive: pathName === "/admin/dashboard/users"
                    },
                    {
                        title: "Add New",
                        url: "/admin/dashboard/users/add",
                    },
                ],
            },
            {
                title: "Achievements",
                url: "#",
                items: [
                    {
                        title: "All Users",
                        url: "/admin/dashboard/achievements",
                        isActive: pathName === "/admin/dashboard/users"
                    },
                    {
                        title: "Project Structure",
                        url: "#",
                    },
                ],
            },
            {
                title: "Departments",
                url: "#",
                items: [
                    {
                        title: "View All",
                        url: "/admin/dashboard/departments",
                        isActive: pathName === "/admin/dashboard/departments"
                    },
                    {
                        title: "Add New",
                        url: "/admin/dashboard/departments/add",
                    },
                ],
            },
        ],
    }
}