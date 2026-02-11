import React, { useContext } from "react";
import { WorkspaceContext } from "../../Context/WorkspaceContext";
import "./HomeScreen.css";
import SidebarNav from "../../Components/SideBarNav/SideBarNav.jsx";

const HomeScreen = () => {
    const { workspace_list_loading, workspace_list_error, workspace_list } =
        useContext(WorkspaceContext);
    console.log(workspace_list);

    if (workspace_list_loading || !workspace_list) {
        return <span>Loading...</span>;
    }

    return (
        <div className="home-container-flex">
            {/* Sidebar a la izquierda */}
            <SidebarNav />

            {/* Contenido principal */}
            <div className="home-main-content">
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
                            <div key={workspace.workspace_id} className="workspace-card">
                                <div className="workspace-avatar">
                                    {workspace.workspace_title.charAt(0).toUpperCase()}
                                </div>
                                <span className="workspace-title">{workspace.workspace_title}</span>
                            </div>
                        ))}

                    {workspace_list.data.workspaces &&
                        workspace_list.data.workspaces.length === 0 && (
                            <span className="empty-message">No tienes workspaces aún 💮</span>
                        )}
                </div>
            </div>
        </div>
    )
};

export default HomeScreen;
