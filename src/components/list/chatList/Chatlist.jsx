import AddUser from "./addUser/AddUser";
import "./chatlist.css";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const Chatlist = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);

    const { currentUser } = useUserStore();
    const { changeChat } = useChatStore();

    useEffect(() => {
        if (currentUser?.id) {
            const unSub = onSnapshot(
                doc(db, "userChats", currentUser.id),
                async (res) => {
                    const data = res.data();
                    if (data && data.chats) {
                        const items = data.chats;

                        const promises = items.map(async (item) => {
                            const userDocRef = doc(
                                db,
                                "users",
                                item.receiverId
                            );
                            const userDocSnap = await getDoc(userDocRef);
                            const user = userDocSnap.data();
                            return { ...item, user };
                        });

                        const chatData = await Promise.all(promises);
                        setChats(
                            chatData.sort((a, b) => b.updatedAt - a.updatedAt)
                        );
                    }
                }
            );

            return () => {
                unSub();
            };
        }
    }, [currentUser.id]);

    const handleSelect = async (chat) => {
        try {
            const updatedChats = chats.map((item) => {
                if (item.chatId === chat.chatId) {
                    return { ...item, isSeen: true };
                }
                return item;
            });

            const userChatsRef = doc(db, "userChats", currentUser.id);

            await updateDoc(userChatsRef, {
                chats: updatedChats.map(({ user, ...rest }) => rest),
            });

            changeChat(chat.chatId, chat.user);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="chatlist">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder="search" />
                </div>
                <img
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt=""
                    className="add"
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>

            {chats.map((chat) => (
                <div
                    className="item"
                    key={chat.chatId}
                    onClick={() => handleSelect(chat)}
                    style={{
                        backgroundColor: chat?.isSeen
                            ? "transparent"
                            : "#5183fe",
                    }}
                >
                    <img src={chat.user.avatar || "avatar.png"} alt="" />
                    <div className="texts">
                        <span>{chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}

            {addMode && <AddUser />}
        </div>
    );
};

export default Chatlist;
