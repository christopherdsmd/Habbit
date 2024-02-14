import React, { useState, useEffect } from "react";
const API = "https://reqres.in/api/users/";


interface DATA {
  id: any;
  first_name: string;
}
const DynamicCheckbox = () => {
  const [users, setUsers] = useState<Array<DATA>>([]);
  const [dataId, setDataId] = useState<Array<any>>([]);
  useEffect(() => {
    const fetchData = async (data: string) => {
      try {
        const response = await fetch(data);
        const users = await response.json();
        setUsers(users.data);
      } catch (e) {
    
      }
    };
    fetchData(API);
  }, []);
  
  const chooseCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(e.target.value);
    if (dataId.includes(id)) {
      const idCollection = dataId.filter((id) => id !== id);
      setDataId(idCollection);
    } else {
      const idCollection = [...dataId];
      idCollection.push(id);
      setDataId(idCollection);
    }
  };

const addHabit = () => 
{

};

  const remove = () => {
    const newList: DATA[] = users.filter(
      (item: any) => !dataId.includes(item.id)
    );
    setUsers(newList);
  };

const DailyCheck = () => 
{
  
}

  return (
    <div style={styles.container}>
    
      {users.length === 0 && <h4> No Habits yet...</h4>}
      {users.length > 0 &&
        users.map((item: any) => (
          <div key={item.id} style={styles.checkbox}>
            <button style={styles.rmbutton} onClick={remove}>
              🗑️
            </button>
            <span style={styles.first_name}>{item.first_name}</span>
            <span>
              <input
                type="button"
                value={item.id}
                onChange={chooseCheckbox}
                onClick={DailyCheck}
              />
            </span>
          </div>
        ))}
          <button style={styles.addbutton} onClick={addHabit}>
        add new habit ➕
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row', // Change to 'row'
    flexWrap: 'wrap', // Add flexWrap to allow items to wrap to the next row
  },
  checkbox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'black',
    margin: '10px',
    padding: '14px 25px',
    width: '200px', // Adjust the width as needed
  },
  id: {
    color: '#ffffff',
    marginRight: '10px',
  },
  first_name: {
    color: '#ffffff',
    marginRight: '10px',
  },
  
addbutton: 
{
  marginTop: 15,
  color: '#ffffff',
  width: '100%',
  cursor: 'pointer',
  padding: '15px 30px',
  border: 'none',
  fontWeight: 'bold',
  backgroundColor: 'green',
},

  rmbutton: {
    marginTop: 15,
    color: '#ffffff',
    width: '50%',
    cursor: 'pointer',
    padding: '5px 5px',
    alignItems: 'right',

    fontWeight: 'bold',
    backgroundColor: 'red',
  },
};


export default DynamicCheckbox;