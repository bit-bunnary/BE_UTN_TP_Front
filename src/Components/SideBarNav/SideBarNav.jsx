import React, { useState } from 'react';
import { BsPersonWorkspace } from "react-icons/bs";
import { GiLockedHeart , GiHeartKey } from "react-icons/gi";
import { TbLockHeart , TbBellHeart } from "react-icons/tb";
import { BsChatHeart , BsGear} from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { RiHomeHeartLine } from "react-icons/ri";
import "./SideBarNav.css"

const SidebarNav = () => {


    const [showSettingsMenu, setShowSettingsMenu] =useState(false)


    return (
        <div className="sidebar-nav">
            <div className='sidebar-nav__upper'>    
                <button className="sidebar-nav__button" title="Workspaces"><BsPersonWorkspace /></button>
                <button className="sidebar-nav__button" title="Inicio"><RiHomeHeartLine  /></button>
                <button className="sidebar-nav__button" title="Mensajes Directos"><BsChatHeart /></button>
                <button className="sidebar-nav__button" title="Actividad"><TbBellHeart /></button>
                <button className="sidebar-nav__button" title="Configuración" onClick={()=> setShowSettingsMenu(true)}>
                    <BsGear /> 
                </button>
            </div>
            <div className='sidebar-nav__lower'>
                <button className="sidebar-nav__button" title="Perfil">
                    <GiLockedHeart  />
                </button>{/* <img src='/Pinky_PFP.png' className='sidebar-nav__PFP'></img> */}
            </div>
            
            {showSettingsMenu && (
                <div className="settings-popup__overlay">
                    <div className="settings-popup">
                        <h3>Configuración</h3>
                        <ul className="settings-popup__list">
                            <li className="settings-popup__item"><GiHeartKey/> Cuenta</li>
                            <li className="settings-popup__item"><TbLockHeart /> Privacidad</li>
                            <li className="settings-popup__item"><BsChatHeart/> Chats</li>
                            <li className="settings-popup__item"><TbBellHeart/> Notificaciones</li>
                            <li className="settings-popup__item"><BiLogOut/> Cerrar sesión</li>
                        </ul>
                        <button className="settings-popup__close-btn" onClick={() => setShowSettingsMenu(false)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SidebarNav;