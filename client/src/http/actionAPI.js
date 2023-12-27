import { $authHost, $host } from "./http";

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

// export const messageHistory = async (chat_id) => {
//     const { data } = await $authHost.post('api/user/messageHistory', { chat_id })
//     return data
// }

// export const sendMessage = async (chat_id, content) => {
//     const data = await $authHost.post('api/user/sendMessage', { chat_id, content })
//     return data
// }