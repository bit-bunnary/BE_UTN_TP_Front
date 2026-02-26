import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import './InviteMemberScreen.css'

const InviteMemberScreen = () => {
    const { workspaceId } = useParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("User");
    const [message, setMessage] = useState("");

    const roles = ["Owner", "Admin", "User"];

    console.log(role);

    const handleInvite = async () => {
        if (!email.trim()) {
            setMessage("Debes ingresar un email");
            return;
        }

        try {
            const res = await fetch(`https://be-utn-tp-back.vercel.app/api/workspace/${workspaceId}/members`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                },
                body: JSON.stringify({ email, role }),
            });
            const data = await res.json();

            if (!data.ok) {
                setMessage(`Error: ${data.message}`);
                return;
            }

            setMessage("Invitación enviada correctamente ✅");
            setEmail("");
            setRole("User");
        } catch (error) {
            console.error(error);
            setMessage("Error enviando invitación");
        }
    };

    return (
        <div className="invite-container-flex">
            <div className="invite-main-content">
                <div className="invite-workspace-card">
                    <div className="invite-workspace-header">
                        <h1>Invitar a un miembro</h1>
                        <p>Agrega un usuario para que participe en este workspace</p>
                    </div>

                    <div className="invite-form">
                        {/* Email */}
                        <div className="invite-form-group">
                            <label className="invite-form-label">Email del usuario</label>
                            <input
                                type="email"
                                className="invite-form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="usuario@ejemplo.com"
                            />
                        </div>

                        {/* Rol */}
                        <div className="invite-form-group">
                            <label className="invite-form-label">Rol</label>
                            <select
                                className="invite-form-input"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                {roles.map((r) => (
                                    <option key={r} value={r}>{r === "User" ? "Miembro" : r}</option>
                                ))}
                            </select>
                        </div>

                        {message && <p className="invite-error-message">{message}</p>}

                        <button className="invite-submit-btn" onClick={handleInvite}>
                            Enviar invitación
                        </button>

                        <div className="invite-back-link">
                            <a onClick={() => navigate(-1)}>Volver al workspace</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InviteMemberScreen;