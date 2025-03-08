export const generateSidebar = (pathName: string) => {
    return {
        navMain: [
            {
                title: "Users",
                url: "#",
                items: [
                    {
                        title: "All Users",
                        url: "/dashboard/admin/users",
                        isActive: pathName === "/dashboard/admin/users"
                    },
                    {
                        title: "Project Structure",
                        url: "#",
                    },
                ],
            },
            {
                title: "Achievements",
                url: "#",
                items: [
                    {
                        title: "All Users",
                        url: "/dashboard/admin/users",
                        isActive: pathName === "/dashboard/admin/users"
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
                        url: "/dashboard/admin/departments",
                        isActive: pathName === "/dashboard/admin/departments"
                    },
                    {
                        title: "Add",
                        url: "/dashboard/admin/departments/add",
                    },
                ],
            },
        ],
    }
}