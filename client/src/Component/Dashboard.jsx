import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"



export default function Dashboard () {
    // const [list, setList] = useState([])
    // let URL = "http://localhost:4000/dashboard"
    // useEffect(() => {
    //     axios.get(URL).then((res)=>{
    //         setList(res.data)
    //         console.log(res.data)
    //     })
    // }, [])
  
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(() => {
      console.log(token)
        axios.get("http://localhost:1000/verifyUser",{
          headers:{
            Authorization: `Bearers ${token}`,
            "Content-Type": "Application/json",
            Accept: "Application/json",
          }
        }).then((res)=>{
          console.log(res.data)
          if(!res.data.status){
            localStorage.removeItem("token")
            navigate("/signin")
          }
        })
    }, [])

    
    
    // const click =(e)=>{
    //     e.preventDefault()
    //     axios.get(URL).then((res)=>{
    //         setList(res.data)
    //         console.log(res.data)
    //     })
    // }
   
  return (
    <div>
        
        {/* <section>
            <Users list={list}/>
        </section> */}
        <h1>Welcome</h1>
        {/* <button onClick={click}>click me</button> */}
    </div>
  )
}

