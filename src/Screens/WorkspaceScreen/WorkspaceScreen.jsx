import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import SidebarNav from "../../Components/SideBarNav/SideBarNav.jsx";
import "./WorkspaceScreen.css"
import { TbChevronDown, TbHash } from "react-icons/tb";
import { BsEnvelopeHeart, BsEnvelopeOpenHeart, BsPersonAdd } from "react-icons/bs";
import LoaderEnvelope from "../../Components/LoaderEnvelope/LoaderEnvelope.jsx";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { AuthContext } from "../../Context/AuthContext.jsx";


const WorkspaceScreen = () => {
    const { workspaceId } = useParams();
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    const [workspace, setWorkspace] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const messagesListEnd = useRef(null);
    const [openMenuMessageId, setOpenMenuMessageId] = useState(null);
    const [messageToDelete, setMessageToDelete] = useState(null);

    const { session } = useContext(AuthContext);

    const [messagesLoading, setMessagesLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        /* Me trae el nombre del workspace */
        fetch(`https://be-utn-tp-back.vercel.app/api/workspace/${workspaceId}`, {
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
        /* me trae los canales del workspace */
        fetch(`https://be-utn-tp-back.vercel.app/api/workspace/${workspaceId}/channels`, {
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

        setMessagesLoading(true)
        setMessages([])


        /* me trae mensajes del canal seleccionado */
        fetch(
            `https://be-utn-tp-back.vercel.app/api/workspace/${workspaceId}/channels/${selectedChannel._id}/messages`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {

                console.log(data);
                if (!data.ok) {
                    console.error("Error al traer mensajes:", data.message);
                    return;
                }

                /* guardo los mensajes en el estado */
                setMessages(data.data?.messages || []);
            })
            .catch((err) => console.error("Error fetch mensajes:", err))
            .finally(() => setMessagesLoading(false))
    }, [workspaceId, selectedChannel]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const scrollToBottom = () => {
        messagesListEnd.current?.scrollIntoView({ behavior: "smooth" });
    }

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedChannel) return;

        try {
            const res = await fetch(
                `https://be-utn-tp-back.vercel.app/api/workspace/${workspaceId}/channels/${selectedChannel._id}/messages`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                    },
                    body: JSON.stringify({ content: newMessage }),
                }
            );
            const data = await res.json();

            if (!data.ok) {
                console.error("Error al enviar mensaje:", data.message);
                return;
            }

            const newMsg = {
                ...data.data.message,
                fk_workspace_member_id: {
                    fk_id_user: {
                        username: data.data.user.username
                    }
                }
            };

            setMessages(prev => [...prev, newMsg]);
            setNewMessage("");/* limpia mi input para no tener que borrar mi mensaje */
        }

        catch (error) {
            console.error("Error enviando mensaje:", error);
        }
    };


    /* Permite eliminar el mensaje */
    const handleDeleteMessage = async () => {
        if (!messageToDelete) return;

        try {
            const res = await fetch(
                `https://be-utn-tp-back.vercel.app/api/workspace/${workspaceId}/channels/${selectedChannel._id}/messages/${messageToDelete}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                    },
                }
            );

            const data = await res.json();

            if (!data.ok) {
                console.error("Error al eliminar:", data.message);
                return;
            }

            /* Elimina el mensaje del estado */
            setMessages(prev => prev.filter(msg => msg._id !== messageToDelete));

            /* Cierra el popup */
            setMessageToDelete(null);
            setOpenMenuMessageId(null);

        } catch (error) {
            console.error("Error eliminando mensaje:", error);
        }
    }

    return (
        <div className="workspace-container" onClick={() => setOpenMenuMessageId(null)}>
            <SidebarNav />

            <div className="workspace-content">
                <div className="workspace-title-container">
                    <h1 className="workspace-title">
                        Workspace: {workspace?.title}
                    </h1>
                    <BsPersonAdd
                        size={28}
                        className="invite-icon"
                        onClick={() => navigate(`/workspace/${workspaceId}/invite`)}
                        title="Invitar a un miembro"
                    />
                </div>

                <div className="workspace-body">
                    {/* Listita de canales */}
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
                                    <TbHash /> {channel.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mensajitos del canal */}
                    <div className="messages-container">
                        <h3 className="messages-title">Mensajes</h3>

                        <div className={`messages-list ${messagesLoading ? "loading" : ""}`}>
                            {messagesLoading ? (
                                <LoaderEnvelope size="medium" />
                            ) : messages.length === 0 ? (
                                <p className="empty-state">
                                    No hay mensajes aún
                                    <img src="/mail7.gif" alt="Sparkling Letter ✉︎" className="letter-gif" />
                                </p>
                            ) : (
                                messages.map((msg) => {
                                    return (
                                        <div key={msg._id} className="message-card">
                                            <div className="message-header">
                                                <div className="message-flex-container">
                                                    <span className="message-user">
                                                        {msg.fk_workspace_member_id?.fk_id_user?.username || "Desconocido"}
                                                    </span>{" "}
                                                    {msg.created_at ?
                                                        <span className="message-time">
                                                            {formatDistanceToNow(msg.created_at, { locale: es, addSuffix: true })}
                                                        </span>
                                                        : "(╬▔皿▔)╯ N/A"}
                                                </div>

                                                <div className="message-menu-container">
                                                    {session.id === msg.fk_workspace_member_id.fk_id_user._id && (
                                                        <button className="message-menu-btn" onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpenMenuMessageId(
                                                                openMenuMessageId === msg._id ? null : msg._id
                                                            )
                                                        }}>
                                                            <TbChevronDown size={18} />
                                                        </button>
                                                    )}
                                                    {openMenuMessageId === msg._id && (
                                                        <div className="message-dropdown">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setMessageToDelete(msg._id)
                                                                }} className="delete-option">
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                {msg.message}
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                            <div ref={messagesListEnd} />
                        </div>

                        <div className="messages-input-container">
                            <input
                                type="text"
                                placeholder="Escribe un mensaje..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSendMessage();
                                }}
                                className="messages-input"
                            />
                            <button onClick={handleSendMessage} className="messages-send-btn">
                                {newMessage.trim() === "" ? (
                                    <BsEnvelopeHeart size={20} />
                                ) : (
                                    <BsEnvelopeOpenHeart size={20} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {messageToDelete && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>¿Estás seguro de que quieres eliminar este mensaje?</p>
                        <div className="modal-buttons">
                            <button
                                className="cancel-btn"
                                onClick={() => setMessageToDelete(null)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="confirm-delete-btn"
                                onClick={handleDeleteMessage}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkspaceScreen;