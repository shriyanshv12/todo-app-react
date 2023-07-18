import React, { useEffect, useState } from 'react';
import './style.css';

const getLocalData = () =>{
    const lists= localStorage.getItem("todolist");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData]= useState("");
    const [items, setItems]= useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    const addItem = () =>{
       if (!inputData){
        alert("Please fill the information");
       }
       else if (inputData && toggleButton) {
        setItems(
          items.map((curElmnt) => {
            if (curElmnt.id === isEditItem) {
              return { ...curElmnt, name: inputData };
            }
            return curElmnt;
          })
        );
        setInputData("");
        setIsEditItem(null);
        setToggleButton(false);
      }
       else{
        const newInputData={
            id: new Date().getTime().toString(),
            name: inputData,
        }
        setItems([...items, newInputData]);
        setInputData("");
       }
    };

    const editItem= (index) =>{
        const item_edited = items.find((curElmnt) => {
            return curElmnt.id === index;
        });
            setInputData(item_edited.name);
            setIsEditItem(index);
            setToggleButton(true);
    };

    const deleteItem = (index) =>{
        const updatedItems= items.filter((curElmnt)=>{
            return curElmnt.id !== index;
        });
        setItems(updatedItems);
    };

    useEffect(() => {
     localStorage.setItem("todolist", JSON.stringify(items));
    }, [items]);
    
  return (
    <div className='main'>
    <div className='child'>
      <div className='title-1'>
        <h1>Todo App</h1>
      </div>
      <div className='add-item'>
       <div className="input-group mb-3">
        <input type="text" className="form-control"
         placeholder="Add your todo"
         value={inputData}
         onChange={(event)=> setInputData(event.target.value)}
         />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
                <button className="btn btn-outline-secondary" type="button" onClick={addItem}> save </button>
            )}
       </div>
      </div>   

      <div className='itemlist'>
         {items.map((curElmnt,)=>{
          return( <div className='list' key={curElmnt.id}>
          <div className='item'>
           <h3>{curElmnt.name}</h3>
           <div className='todo-btn'>
                <i className='far fa-edit add-btn' onClick={()=>editItem(curElmnt.id)}></i>
                <i className='fa fa-trash add-btn' onClick={()=>deleteItem(curElmnt.id)}></i>
           </div>
          </div>
      </div>
      )
      })}
      </div>
      </div>
    </div>
  );
};

export default Todo;
