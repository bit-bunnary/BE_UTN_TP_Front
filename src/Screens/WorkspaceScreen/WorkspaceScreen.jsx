import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SidebarNav from "../../Components/SideBarNav/SideBarNav.jsx";
import "./WorkspaceScreen.css"

const WorkspaceScreen = () => {
    const { workspaceId } = useParams();
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    const [workspace, setWorkspace] = useState(null);

    useEffect(() => {
        /* Me trae el nombre del workspace */
        fetch(`http://localhost:8180/api/workspace/${workspaceId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setWorkspace(data.data.workspace);
            })
            .catch((err) => console.error(err));
    }, [workspaceId]);

    useEffect(() => {
    /* me trae canales del workspace */
    console.log("Token enviado:", localStorage.getItem("auth_token")); /* FIXME: Creo que puedo borrar esta línea */
    fetch(`http://localhost:8180/api/workspace/${workspaceId}/channels`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            const channels = data.data?.channels || [];
            setChannels(channels);
            if (channels.length > 0) {
                setSelectedChannel(channels[0]);
            }
        })
        .catch((err) => console.error(err));
}, [workspaceId]);

    useEffect(() => {
        if (!selectedChannel) return;

        /* me trae mensajes del canal seleccionado */
        fetch(
            `http://localhost:8180/api/workspace/${workspaceId}/channels/${selectedChannel.channel_id}/messages`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setMessages(data.messages || []));
    }, [workspaceId, selectedChannel]);

    return (
        <div className="workspace-container">
            <SidebarNav />

            <div className="workspace-content">
                <h1 className="workspace-title">
                    Workspace: {workspace?.title}
                </h1>

                <div className="workspace-body">
                    {/* Lista de canales */}
                    <div className="channels-container">
                        <h3 className="channels-title">Canales</h3>
                        <ul className="channels-list">
                            {channels.map((channel) => (
                                <li
                                    key={channel.channel_id}
                                    onClick={() => setSelectedChannel(channel)}
                                    className={`channel-item ${selectedChannel?.channel_id === channel.channel_id
                                            ? "active"
                                            : ""
                                        }`}
                                >
                                    # {channel.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mensajes del canal */}
                    <div className="messages-container">
                        <h3 className="messages-title">Mensajes</h3>

                        {messages.length === 0 ? (
                            <p className="empty-message">
                                No hay mensajes aún 💌
                            </p>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.message_id}
                                    className="message-card"
                                >
                                    <span className="message-user">
                                        {msg.user_name}:
                                    </span>{" "}
                                    {msg.text}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceScreen;