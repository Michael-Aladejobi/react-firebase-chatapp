import "./chatlist.css";
import { useState } from "react";

const Chatlist = () => {
    const [addMode, setAddMode] = useState(false);
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

            <div className="item">
                <img src="avatar.png" alt="" />
                <div className="texts">
                    <span>Michael A</span>
                    <p>Hello</p>
                </div>
            </div>

            <div className="item">
                <img src="avatar.png" alt="" />
                <div className="texts">
                    <span>Michael A</span>
                    <p>Hello</p>
                </div>
            </div>

            <div className="item">
                <img src="avatar.png" alt="" />
                <div className="texts">
                    <span>Michael A</span>
                    <p>Hello</p>
                </div>
            </div>

            <div className="item">
                <img src="avatar.png" alt="" />
                <div className="texts">
                    <span>Michael A</span>
                    <p>Hello</p>
                </div>
            </div>

            <div className="item">
                <img src="avatar.png" alt="" />
                <div className="texts">
                    <span>Michael A</span>
                    <p>Hello</p>
                </div>
            </div>

            <div className="item">
                <img src="avatar.png" alt="" />
                <div className="texts">
                    <span>Michael A</span>
                    <p>Hello</p>
                </div>
            </div>

            <div className="item">
                <img src="avatar.png" alt="" />
                <div className="texts">
                    <span>Michael A</span>
                    <p>Hello</p>
                </div>
            </div>

            <div className="item">
                <img src="avatar.png" alt="" />
                <div className="texts">
                    <span>Michael A</span>
                    <p>Hello</p>
                </div>
            </div>

            <div className="item">
                <img src="avatar.png" alt="" />
                <div className="texts">
                    <span>Michael A</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    );
};

export default Chatlist;
