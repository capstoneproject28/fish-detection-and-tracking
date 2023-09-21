import React , {useState} from 'react'
import "./css/sidebar.css"

export default function Navbar() {
  const [isActive, setIsActive] = useState(true);

  const toggleSection = () => {
    setIsActive(!isActive);
  };
  const navigationLinks = [
    {
      href: 'example.com',
      iconClass: 'fa-regular fa-building',
      text: 'Home',
      isActive: true,
    },
    {
      href: 'example.com',
      iconClass: 'fa-solid fa-cloud-arrow-up',
      text: 'Upload',
    },
    {
      href: 'example.com',
      iconClass: 'fa-regular fa-chart-bar',
      text: 'Analytics',
    },
    {
      href: 'example.com',
      iconClass: 'fa-solid fa-clock-rotate-left',
      text: 'History',
    },
    {
      href: 'example.com',
      iconClass: 'fa-regular fa-lightbulb',
      text: 'ML Algorithms',
      count: 4
    },
    {
      href: 'example.com',
      iconClass: 'fa-regular fa-circle-user',
      text: 'User details',
    }
  ];

  return (
    <>

    
  <section className={isActive ? 'active' : ''}>
  <div className="button" onClick={toggleSection}>
    <i className="fa-solid fa-bars" />
  </div>
  <div className="sidebar">
    <div className="profile">
      <div className="pro_img">
        <img src="./src/assets/logoMin.png" alt="profile_picture" />
      </div>
      <div className="pro_info">
        <h3>Rohan Soni</h3>
        <p>rsoni@gmail.com</p>
      </div>
    </div>
    <ul>
      {navigationLinks.map((link, index) => (
        <li key={index}>
          <a href={link.href} className={link.isActive ? 'active' : ''}>
            <span className="icon">
              <i className={link.iconClass} />
            </span>
            <span className="item">{link.text}</span>
            {link.count && <span className="count">{link.count}</span>}
          </a>
        </li>
      ))}
    </ul>
  </div>
</section>

    
</>
  )
}