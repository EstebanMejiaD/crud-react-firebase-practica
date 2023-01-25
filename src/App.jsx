import "./App.css";
import react, { useState, useEffect } from "react";
import { firebase } from "./firebase";
import Footer from './components/Footer'

function App() {
  const [listUser, setListUser] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [id, setId] = useState("");
  const [moodEdit, setMoodEdit] = useState(false)
  useEffect(() => {
    const getData = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("usuarios").get();
        const arrayData = data.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setListUser(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);


  const addUser = async (e)=> {
    e.preventDefault()
    
    if (!nombre.trim()) {
      alert("Inrgesa un nombre")
      return
    }
    if (!apellido.trim()) {
      alert("Inrgesa un apellido")
      return
    }

    try {
      
      const db = firebase.firestore()
      const newUser = {
        nombre,
        apellido
      }
      const data = await db.collection("usuarios").add(newUser)
      setListUser([
        ...listUser,
      {
        id: data.id,
        ...newUser
      }
      ])


    } catch (error) {
      console.log(error)
    }

    setNombre("")
    setApellido("")
  }

  const deleteUser = async (id)=> {
    try {
      const db = firebase.firestore()
      await db.collection("usuarios").doc(id).delete()
      const filterList = listUser.filter((user)=> user.id!==id)
      setListUser(filterList)
    } catch (error) {
      console.log(error)
    }
  }

  const fEditMood = (user)=> {
    setMoodEdit(true)
    setNombre(user.nombre)
    setApellido(user.apellido)
    setId(user.id)
  }


  const editUser = async (e)=> {
    e.preventDefault()
    
    if (!nombre.trim()) {
      alert("Inrgesa un nombre")
      return
    }
    if (!apellido.trim()) {
      alert("Inrgesa un apellido")
      return
    }
    try {
      
      const db = firebase.firestore()
      await db.collection("usuarios").doc(id).update({
        nombre, apellido
      })

      const listEdited = listUser.map((user)=> user.id===id ? {id, nombre,apellido} : user)
      setListUser(listEdited)
      setMoodEdit(false)
      setId("")
      setNombre("")
      setApellido("")
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="container my-4">
      <form className="card form-register p-3" onSubmit={ moodEdit ? editUser : addUser}>
        <div className="text-center head-form">
          <h1>{moodEdit ? "Editar usuario" : "Registro de usuarios"}</h1>
        </div>
        <input
          className="form-control my-3 "
          type="text"
          placeholder="Nombre de usuario..."
          onChange={(e) => {
            setNombre(e.target.value);
          }}
          value={nombre}
        />
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Apellido de usuario..."
          onChange={(e) => {
            setApellido(e.target.value);
          }}
          value={apellido}
        />
        <div className="d-grid gap-2">
          {
            moodEdit ? <button className="btn btn-warning">Editar</button> :
            <button className="btn btn-success">Registrar</button>
          }
        </div>
      </form>

      <div className="my-4">
        <div className="head-list text-center">
          <h2>Lista de usuarios registrados</h2>
        </div>
        <ul className="text-center ">
          {listUser.map((user) => (
            <li key={user.id}>
              {user.nombre} - {user.apellido}
              <button className="btn btn-danger m-2" onClick={()=> deleteUser(user.id)}>Eliminar</button>
              <button className="btn btn-warning m-1" onClick={()=> fEditMood(user)}>Editar</button>
            </li>
          ))}
        </ul>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
