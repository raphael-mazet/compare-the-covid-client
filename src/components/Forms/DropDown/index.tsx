// import React, { useState } from 'react';
// import onClickOutside from 'react-onclickoutside';

// function Dropdown({ title, items, multiSelect = false }: any) {
//   const [open, setOpen] = useState(false);
//   const [selection, setSelection] = useState<any>([]);
//   const toggle = () => setOpen(!open);

//   Dropdown.handleClickOutside = () => setOpen(false);

//   function handleOnClick(item: any) {
//     if (!selection.some((current: any) => current.id === item.id)) {
//       if (!multiSelect) {
//         setSelection([item]);
//       } else if (multiSelect) {
//         setSelection([...selection, item]);
//       }
//     } else {
//       let selectionAfterRemoval = selection;
//       selectionAfterRemoval = selectionAfterRemoval.filter(
//         (current:any) => current.id !== item.id
//       );
//       setSelection([...selectionAfterRemoval]);
//     }
//   }

//   function isItemInSelection(item :any) {
//     if (selection.some((current:any) => current.id === item.id)) {
//       return true;
//     }
//     return false;
//   }

//   return (
//     <div className="dd-wrapper">
//       <div
//         tabIndex={0}
//         className="dd-header"
//         role="button"
//         onKeyPress={() => toggle(!open)}
//         onClick={() => toggle(!open)}
//       >
//         <div className="dd-header__title">
//           <p className="dd-header__title--bold">{title}</p>
//         </div>
//         <div className="dd-header__action">
//           <p>{open ? 'Close' : 'Open'}</p>
//         </div>
//       </div>
//       {open && (
//         <ul className="dd-list">
//           {items.map((item:any) => (
//             <li className="dd-list-item" key={item.id}>
//               <button type="button" onClick={() => handleOnClick(item)}>
//                 <span>{item.value}</span>
//                 <span>{isItemInSelection(item) && 'Selected'}</span>
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// const clickOutsideConfig = {
//   handleClickOutside: () => Dropdown.handleClickOutside,
// };

// export default onClickOutside(Dropdown, clickOutsideConfig);

export default {}