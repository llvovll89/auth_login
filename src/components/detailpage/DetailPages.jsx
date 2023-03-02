import React, { useEffect, useState } from 'react'
import TodosDataService from '../../context/UserAuthContext'

const DetailPages = ({getTodosId}) => {
  const [ Todos, setTodos ] = useState();

  const getTodos = async () => {
    const data = await TodosDataService.getAllTodos();
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
}

useEffect(() => {
  getTodos();
}, [])

  return (
    <div>DetailPages</div>
  )
}

export default DetailPages  