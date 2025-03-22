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
                        isActive: pathName ===  "/admin/dashboard/users/add"
                    },
                    {
                        title: "Take Attendence",
                        url: "/admin/dashboard/users/attendence",
                        isActive: pathName ===  "/admin/dashboard/users/add"
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
                        isActive: pathName ===  "/admin/dashboard/departments/add"
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