import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SidebarNav from "../../Components/SideBarNav/SideBarNav.jsx";

const WorkspaceScreen = () => {
    const { workspaceId } = useParams();
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Traer canales del workspace
        fetch(`http://localhost:3000/workspaces/${workspaceId}/channels`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setChannels(data.channels || []);
                if (data.channels && data.channels.length > 0) {
                    setSelectedChannel(data.channels[0]);
                }
            });
    }, [workspaceId]);

    useEffect(() => {
        if (!selectedChannel) return;

        // Traer mensajes del canal seleccionado
        fetch(
            `http://localhost:3000/workspaces/${workspaceId}/channels/${selectedChannel.channel_id}/messages`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setMessages(data.messages || []));
    }, [workspaceId, selectedChannel]);

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <SidebarNav />

            <div style={{ flex: 1, padding: "2rem" }}>
                <h1>Workspace: {workspaceId}</h1>

                <div style={{ display: "flex", gap: "2rem" }}>
                    {/* Lista de canales */}
                    <div style={{ width: "200px" }}>
                        <h3>Canales</h3>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {channels.map((channel) => (
                                <li
                                    key={channel.channel_id}
                                    onClick={() => setSelectedChannel(channel)}
                                    style={{
                                        cursor: "pointer",
                                        padding: "0.5rem",
                                        backgroundColor:
                                            selectedChannel?.channel_id === channel.channel_id
                                                ? "#f472b6"
                                                : "transparent",
                                        color:
                                            selectedChannel?.channel_id === channel.channel_id
                                                ? "white"
                                                : "black",
                                        borderRadius: "4px",
                                        marginBottom: "0.25rem",
                                    }}
                                >
                                    #{channel.channel_name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mensajes del canal */}
                    <div style={{ flex: 1 }}>
                        <h3>Mensajes</h3>
                        {messages.length === 0 ? (
                            <p>No hay mensajes aún 💌</p>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.message_id}
                                    style={{
                                        padding: "0.5rem",
                                        marginBottom: "0.25rem",
                                        backgroundColor: "#fff0f6",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <strong>{msg.user_name}: </strong>
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