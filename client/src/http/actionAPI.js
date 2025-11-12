import { $authHost } from "./http";

export const userList = async () => {
    const data = await $authHost.get('api/user/userList',)
    const { userList } = data.data
    return userList
}

export const chatLink = async (user_id) => {
    const { data } = await $authHost.post('api/user/createChat', { user_id })
    const { id } = data.result
    return id
}