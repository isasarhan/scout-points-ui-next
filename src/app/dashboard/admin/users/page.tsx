import UsersModule from "@/modules/dashboard/admin/users";
import useUsers from "@/services/users";
import { cookies } from "next/headers";

// export async function getData() {
//     const token = (await cookies()).get("token")?.value;
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         cache: "no-store",
//     });

//     if (!res.ok) throw new Error("Failed to fetch users");
//     return res.json();
// }

const UsersPage = async () => {
    const token = (await cookies()).get("token")?.value;
    
    const { getAll } = useUsers({ token: token })
    const data = await getAll();

    return (
        <UsersModule users={data} />
    );
};

export default UsersPage;
