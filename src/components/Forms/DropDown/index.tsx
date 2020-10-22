// import React, { useState, useEffect } from 'react';

// const Dropdown = (): JSX.Element => {
//   const [showMenu, setShowMenu] = useState<boolean>(false)
//   let dropdownMenu = React.useRef("dropdownMenu")

  
//   console.log(React.useRef("dropdownMenu"))

//   const showTheMenu = (e: any) => {
//     e.preventDefault();
//     setShowMenu(!showMenu);
//     document.addEventListener('click', closeMenu);
//   }
  
//   const closeMenu = (e:any) => {
//     if (!(dropdownMenu.current.contains(e.target) )) {
//       setShowMenu(false);
//       document.removeEventListener('click', closeMenu);
//     }
//   }

//     return (
//       <div>
//         <button onClick={showTheMenu}>
//           Show menu
//         </button>
        
//         {
//           showMenu
//             ? (
//               <div className="dropdownMenu" ref="dropdownMenu">
//                 <button> Menu item 1 </button>
//                 <button> Menu item 2 </button>
//                 <button> Menu item 3 </button>
//               </div>
//             )
//             : (
//               null
//             )
//         }
//       </div>
//     );
// }

// export default Dropdown;

export default {}