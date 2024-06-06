
export const load = async ({ cookies }) => {

    return {
        session: cookies.get('sb-lgjyueqzwbidwvcnzide-auth-token'),
    }
} 