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
    const [user, setUser] = useState(null); // Ensure useState is imported and used
    const { currentUser } = useUserStore();

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");

            // Query for username in lowercase
            const q = query(userRef, where("username", "==", username));
            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data());
            } else {
                setUser(null); // Reset user state if no user is found
            }
        } catch (err) {
            console.log(err);
            setUser(null); // Reset user state if an error occurs
        }
    };

    const handleAdd = async () => {
        if (!user) return;

        const chatRef = doc(db, "chats", user.id); // Use user.id as the document ID

        try {
            // Check if the chat document already exists
            const newChatRef = await getDoc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                }),
            });

            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                }),
            });
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
