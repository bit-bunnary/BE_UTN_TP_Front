import React, { useContext, useState } from "react";
import { WorkspaceContext } from "../../Context/WorkspaceContext";
import "./HomeScreen.css";
import SidebarNav from "../../Components/SideBarNav/SideBarNav.jsx";
import { useNavigate } from "react-router";
import { HiOutlineDotsVertical } from "react-icons/hi";

const HomeScreen = () => {
    const { workspace_list_loading, workspace_list_error, workspace_list } =
        useContext(WorkspaceContext);
    console.log(workspace_list)

    const [openMenuWorkspaceId, setOpenMenuWorkspaceId] = useState(null)
    const [workspaceToDelete, setWorkspaceToDelete] = useState(null)

    const navigate = useNavigate()

    if (workspace_list_loading || !workspace_list) {
        return <span>Loading...</span>;
    }

    const handleDeleteWorkspace = async () => {
        if (!workspaceToDelete) return;

        try {
            const res = await fetch(
                `http://localhost:8180/api/workspace/${workspaceToDelete}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                    },
                }
            );

            const data = await res.json();

            if (!data.ok) {
                console.error("Error al eliminar workspace:", data.message);
                return;
            }

            // Lo sacamos del estado
            workspace_list.data.workspaces =
                workspace_list.data.workspaces.filter(
                    w => w.workspace_id !== workspaceToDelete
                );

            setWorkspaceToDelete(null);
            setOpenMenuWorkspaceId(null);

        } catch (error) {
            console.error("Error eliminando workspace:", error);
        }
    };

    return (
        <div className="home-container-flex" onClick={() => setOpenMenuWorkspaceId(null)}>
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

                    <div className="workspace-scroll-wrapper">
                        <div className="workspace-scroll-container">
                            <div className="workspace-grid">
                                {workspace_list.data.workspaces &&
                                    workspace_list.data.workspaces.length > 0 &&
                                    workspace_list.data.workspaces.map((workspace) => (
                                        <div
                                            key={workspace.workspace_id}
                                            className="workspace-card"
                                            onClick={() => navigate(`/workspace/${workspace.workspace_id}`)}
                                        >

                                            <div className="workspace-avatar">
                                                {workspace.workspace_title.charAt(0).toUpperCase()}
                                            </div>

                                            <span className="homescreen-workspace-title">
                                                {workspace.workspace_title}
                                            </span>

                                            <div
                                                className="workspace-menu-container"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    className={`workspace-menu-btn ${openMenuWorkspaceId === workspace.workspace_id ? "active" : ""
                                                        }`}
                                                    onClick={() =>
                                                        setOpenMenuWorkspaceId(
                                                            openMenuWorkspaceId === workspace.workspace_id
                                                                ? null
                                                                : workspace.workspace_id
                                                        )
                                                    }
                                                >
                                                    <HiOutlineDotsVertical size={18} />
                                                </button>

                                                {openMenuWorkspaceId === workspace.workspace_id && (
                                                    <div className="workspace-dropdown">
                                                        <button
                                                            className="delete-option"
                                                            onClick={() =>
                                                                setWorkspaceToDelete(workspace.workspace_id)
                                                            }
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
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
            </div>
            {workspaceToDelete && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>¿Estás seguro de que quieres eliminar este workspace?</p>
                        <div className="modal-buttons">
                            <button
                                className="cancel-btn"
                                onClick={() => setWorkspaceToDelete(null)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="confirm-delete-btn"
                                onClick={handleDeleteWorkspace}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )})
        </div>
    )
};

export default HomeScreen;
