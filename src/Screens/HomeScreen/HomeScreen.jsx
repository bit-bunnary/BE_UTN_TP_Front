import React, { useContext } from "react";
import { WorkspaceContext } from "../../Context/WorkspaceContext";
import "./HomeScreen.css";
import SidebarNav from "../../Components/SideBarNav/SideBarNav.jsx";
import { useNavigate } from "react-router";

const HomeScreen = () => {
    const { workspace_list_loading, workspace_list_error, workspace_list } =
        useContext(WorkspaceContext);
    console.log(workspace_list)

    const navigate = useNavigate()

    if (workspace_list_loading || !workspace_list) {
        return <span>Loading...</span>;
    }

    return (
        <div className="home-container-flex">
            <SidebarNav />

            {/* Main content OwO */}
            <div className="home-main-content">
                <div className="home-centered-content">
                    <div className="home-header">
                        <h1>Bienvenido nuevamente 🌸</h1>
                        <p className="home-subtitle">Elige un workspace para comenzar</p>
                    </div>

                    {workspace_list_error && (
                        <span className="error-message">{workspace_list_error.message}</span>
                    )}

                    <div className="workspace-grid">
                        {workspace_list.data.workspaces &&
                            workspace_list.data.workspaces.length > 0 &&
                            workspace_list.data.workspaces.map((workspace) => (
                                <div key={workspace.workspace_id} className="workspace-card" onClick={() => navigate(`/workspace/${workspace.workspace_id}`)}>

                                    <div className="workspace-avatar">
                                        {workspace.workspace_title.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="homescreen-workspace-title">{workspace.workspace_title}</span>

                                </div>
                            ))}

                        {workspace_list.data.workspaces &&
                            workspace_list.data.workspaces.length === 0 && (
                                <span className="empty-message">No tienes workspaces aún 💮</span>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomeScreen;
