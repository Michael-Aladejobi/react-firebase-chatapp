import React, { useState } from "react";
import "./addUser.css";
import {
    collection,
    where,
    query,
    getDocs,
    serverTimestamp,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useUserStore } from "../../../../lib/userStore";

function AddUser() {
    const [user, setUser] = useState(null);
    const { currentUser } = useUserStore();

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username));
            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data());
            } else {
                setUser(null);
            }
        } catch (err) {
            console.log(err);
            setUser(null);
        }
    };

    
        const handleAdd = async () => {
            if (!user) return;

            const chatRef = doc(db, "chats", user.id);

            try {
                const newChatDoc = await getDoc(chatRef);

                if (!newChatDoc.exists()) {
                    // Create the chat document if it doesn't exist
                    await setDoc(chatRef, {
                        createdAt: serverTimestamp(),
                        messages: [],
                    });
                }

                const userChatsRef = doc(db, "userChats", user.id);
                const userChatsSnap = await getDoc(userChatsRef);

                if (!userChatsSnap.exists()) {
                    // If the user's chat document doesn't exist, create it
                    await setDoc(userChatsRef, {
                        chats: [
                            {
                                chatId: chatRef.id,
                                lastMessage: "",
                                receiverId: currentUser.id,
                                updatedAt: Date.now(),
                            },
                        ],
                    });
                } else {
                    // If it exists, update it
                    await updateDoc(userChatsRef, {
                        chats: arrayUnion({
                            chatId: chatRef.id,
                            lastMessage: "",
                            receiverId: currentUser.id,
                            updatedAt: Date.now(),
                        }),
                    });
                }

                const currentUserChatsRef = doc(
                    db,
                    "userChats",
                    currentUser.id
                );
                const currentUserChatsSnap = await getDoc(currentUserChatsRef);

                if (!currentUserChatsSnap.exists()) {
                    // If the current user's chat document doesn't exist, create it
                    await setDoc(currentUserChatsRef, {
                        chats: [
                            {
                                chatId: chatRef.id,
                                lastMessage: "",
                                receiverId: user.id,
                                updatedAt: Date.now(),
                            },
                        ],
                    });
                } else {
                    // If it exists, update it
                    await updateDoc(currentUserChatsRef, {
                        chats: arrayUnion({
                            chatId: chatRef.id,
                            lastMessage: "",
                            receiverId: user.id,
                            updatedAt: Date.now(),
                        }),
                    });
                }
            } catch (err) {
                console.log(err);
            }
        };


    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                />
                <button type="submit">Search</button>
            </form>
            {user ? (
                <div className="user">
                    <div className="detail">
                        <img
                            src={user.avatar || "./avatar.png"}
                            alt="User Avatar"
                        />
                        <span>{user.username}</span>
                    </div>
                    <button onClick={handleAdd}>Add User</button>
                </div>
            ) : (
                <p>
                    <small>No User Found!</small>
                </p>
            )}
        </div>
    );
}

export default AddUser;
