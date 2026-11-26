import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

// Misma clave que usaba use-dark-mode, así se respeta la preferencia ya guardada.
const STORAGE_KEY = 'darkMode';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

// El script inline de public/index.html ya puso body.dark-mode / body.light-mode antes
// del primer pintado (sin parpadeo); aquí solo se lee ese estado.
const isDarkOnBody = () => document.body.classList.contains('dark-mode');

const hasStoredPreference = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
};

const DarkModeToggle = () => {
  const [dark, setDark] = useState(isDarkOnBody);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark);
    document.body.classList.toggle('light-mode', !dark);
  }, [dark]);

  // Si el usuario nunca eligió, sigue el tema del sistema cuando este cambia.
  useEffect(() => {
    const media = window.matchMedia(MEDIA_QUERY);
    const onChange = (e) => {
      if (!hasStoredPreference()) setDark(e.matches);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Sin localStorage (modo privado estricto): el cambio vale solo para esta sesión.
    }
  };

  const label = dark ? 'Activar modo claro' : 'Activar modo oscuro';

  return (
    <button type="button" className="icon-button" onClick={toggle} aria-label={label} title={label}>
      {dark ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default DarkModeToggle;
