import { useEffect, useState } from 'react';
import Logo from '../../img/brasao_ufpi.png';
import { navigationLinks } from '../../data/data';
import "./Sidebar.css";
import { useContext } from 'react';
import { SidebarContext } from '../../context/sidebarContext';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  
  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={Logo} alt="brasao" />
        </div>
        <span className="info-name">Sistema PPGCC</span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {
            navigationLinks.map((navigationLink, index) => (
              <li className="nav-item" key={navigationLink.id}>
                <Link to={navigationLink.path}
                  className={ `nav-link ${ navigationLink.id === activeLinkIdx ? 'active' : null }` }>
                  <img src={navigationLink.image} className="nav-link-icon" alt={navigationLink.title} />
                  <span className="nav-link-text">{navigationLink.title}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
