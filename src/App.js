import React, { useState, useEffect } from 'react';

const App = () => {
  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState({ username: '', age: '' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const defaultData = [
      { username: 'surya', age: 29 },
      { username: 'rtaya', age: 24 },
      { username: 'eraa', age: 23 },
    ];
    const savedData = JSON.parse(localStorage.getItem('userData'));
    if (!savedData) {
      localStorage.setItem('userData', JSON.stringify(defaultData));
      setUserData(defaultData);
    } else {
      setUserData(savedData);
    }
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      setCurrentUser(userData[selectedIndex]);
    }
  }, [selectedIndex, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = [...userData];
    updatedData[selectedIndex] = currentUser;
    setUserData(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));
    alert('User information updated successfully!');
  };

  const handleUserSelect = (e) => {
    setSelectedIndex(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Update User Information</h1>
      <div style={styles.selectContainer}>
        <label htmlFor="userSelect" style={styles.label}>
          Select User:
        </label>
        <select
          id="userSelect"
          onChange={handleUserSelect}
          value={selectedIndex}
          style={styles.select}
        >
          {userData.map((user, index) => (
            <option key={index} value={index}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={currentUser.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="age" style={styles.label}>
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={currentUser.age}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Update
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  selectContainer: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
  select: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default App;
