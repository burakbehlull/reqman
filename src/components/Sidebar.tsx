import { FaHome, FaUser, FaCog, FaSignOutAlt, FaChartPie } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()

  return (
  
    <div className="h-full border border-solid border-stone-300 shadow-xl rounded-xl flex flex-col">
      <div className="p-6 text-3xl font-extrabold text-neutral border-b border-base-300">
        Request Man
      </div>

      <ul className="menu p-6 flex-1 text-sm space-y-2 w-[38vh]">
        <li onClick={()=>navigate('/')}>
          <a className="flex items-center gap-4 p-3 rounded-lg hover:bg-neutral hover:text-primary-content transition-all">
            <FaHome size={22} /> {t("sidebar_home_button_text")}
          </a>
        </li>
		<li onClick={()=>navigate('/settings')}>
          <a className="flex items-center gap-4 p-3 rounded-lg hover:bg-neutral hover:text-primary-content transition-all">
            <IoIosSettings size={22} /> {t("sidebar_settings_button_text")}
          </a>
        </li>
      </ul>

      {/*
      <div className="p-6 border-t border-base-300">
        <button className="btn btn-error w-full flex items-center gap-3 text-lg">
          <FaSignOutAlt size={20} /> Logout
        </button>
      </div>
	  */}
    </div>
  );
}
