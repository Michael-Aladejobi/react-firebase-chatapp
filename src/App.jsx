import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";

const App = () => {
    return (
        <>
            <div className="container">
                <List />
                <Chat />
                <Detail />
            </div>
            <div className="maintenance">
                <small>
                    &copy; All rights Reserved | Maintained by ETTRONICS TEAM
                </small>
            </div>
        </>
    );
};

export default App;
