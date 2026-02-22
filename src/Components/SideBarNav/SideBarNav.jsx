import React, { useState } from 'react';
import { GiLockedHeart , GiHeartKey } from "react-icons/gi";
import { TbLockHeart , TbBellHeart, TbHeartPlus , TbMessage2Heart , TbHome , TbSettingsHeart, TbDoorExit } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import "./SideBarNav.css"

const SidebarNav = () => {


    const [showSettingsMenu, setShowSettingsMenu] =useState(false)


    return (
        <div className="sidebar-nav">
            <div className='sidebar-nav__upper'>    
                <button className="sidebar-nav__button" title="Inicio"><TbHome  /></button>
                <button className="sidebar-nav__button" title="Mensajes Directos"><TbMessage2Heart  /></button>
                <button className="sidebar-nav__button" title="Actividad"><TbBellHeart /></button>
                <button className="sidebar-nav__button" title="Crear Workspace"><TbHeartPlus  /></button>
                
                <button className="sidebar-nav__button" title="Configuración" onClick={()=> setShowSettingsMenu(true)}>
                    <TbSettingsHeart /> 
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
                            <li className="settings-popup__item"><TbMessage2Heart /> Chats</li>
                            <li className="settings-popup__item"><TbBellHeart/> Notificaciones</li>
                            <li className="settings-popup__item"><TbDoorExit /> Cerrar sesión</li>
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