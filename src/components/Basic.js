// here's an extremely bare bones example of an autocomplete
import React, { useContext } from "react";
import Downshift from "downshift";

const items = [
  { value: "apple" },
  { value: "pear" },
  { value: "orange" },
  { value: "grape" },
  { value: "banana" },
  { value: "mango" },
  { value: "durian" },
  { value: "kiwi" },
  { value: "pineapple" }
];

const DownshiftContext = React.createContext();

function Basic({ innerRef }) {
  const {
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    isOpen,
    inputValue,
    highlightedIndex,
    selectedItem
  } = useContext(DownshiftContext);

  return (
    <div ref={innerRef}>
      <label {...getLabelProps()}>Enter a fruit </label>
      <input {...getInputProps()} />
      <ul {...getMenuProps()}>
        {isOpen
          ? items
              .filter(item => !inputValue || item.value.includes(inputValue))
              .map((item, index) => (
                <li
                  {...getItemProps({
                    key: item.value,
                    index,
                    item,
                    style: {
                      backgroundColor:
                        highlightedIndex === index ? "lightgray" : null,
                      fontWeight: selectedItem === item ? "bold" : "normal"
                    }
                  })}
                >
                  {item.value}
                </li>
              ))
          : null}
      </ul>
    </div>
  );
}

export default () => (
  <Downshift
    onChange={selection => alert(`You selected ${selection.value}`)}
    itemToString={item => (item ? item.value : "")}
  >
    {downshift => (
      <DownshiftContext.Provider value={downshift}>
        <h2>Basic Example</h2>
        <div>
          <Basic {...downshift.getRootProps({ refKey: "innerRef" })} />
        </div>
      </DownshiftContext.Provider>
    )}
  </Downshift>
);

// export default () => (
//   <Downshift
//     onChange={selection => alert(`You selected ${selection.value}`)}
//     itemToString={item => (item ? item.value : '')}
//   >
//     {downshift => (
//       <Basic
//         downshift={downshift}
//         {...downshift.getRootProps({refKey: 'innerRef'})}
//       />
//     )}
//   </Downshift>
// )

// export default () => (
//   <Downshift
//     onChange={selection => alert(`You selected ${selection.value}`)}
//     itemToString={item => (item ? item.value : '')}
//   >
//     {({
//       getInputProps,
//       getItemProps,
//       getLabelProps,
//       getMenuProps,
//       isOpen,
//       inputValue,
//       highlightedIndex,
//       selectedItem,
//     }) => (
//       <div>
//         <label {...getLabelProps()}>Enter a fruit</label>
//         <input {...getInputProps()} />
//         <ul {...getMenuProps()}>
//           {isOpen
//             ? items
//                 .filter(item => !inputValue || item.value.includes(inputValue))
//                 .map((item, index) => (
//                   <li
//                     {...getItemProps({
//                       key: item.value,
//                       index,
//                       item,
//                       style: {
//                         backgroundColor:
//                           highlightedIndex === index ? 'lightgray' : null,
//                         fontWeight: selectedItem === item ? 'bold' : 'normal',
//                       },
//                     })}
//                   >
//                     {item.value}
//                   </li>
//                 ))
//             : null}
//         </ul>
//       </div>
//     )}
//   </Downshift>
// )
