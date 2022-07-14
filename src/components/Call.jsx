import React, { useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDeleteLeft, faPhone } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setProduct } from "../redux/actions/productActions"

// #31d68b
// #e91e63
const Container = styled.div`
  background-color: #673ab7;
  padding: 50px 0;
  border-radius: 8px;
  width: 400px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const NumberPhone = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  padding-top: 50px;
  position: relative;
`
const Input = styled.input`
  border: none;
  border-bottom: 1px solid #fff;
  background-color: transparent;
  outline: none;
  width: calc(100% - 50px - 40px);
  padding: 10px 0;
  padding-right: 40px;
  font-size: 2rem;
  font-weight: 300;
  color: #fff;
`
const DeletePhone = styled.div`
  position: absolute;
  bottom: 10px;
  right: 25px;
  font-size: 1.4rem;
  color: #fff;
  outline: none;
  cursor: pointer;
`
const MenuPhone = styled.ul`
  margin: 0;
  padding: 0;
  margin: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 35px;
  text-align: center;
`
const ItemPhone = styled.li`
  list-style: none;
  color: #fff;
  font-size: 2rem;
  font-weight: 300;

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 2px 0 rgb(0 0 0 / 10%);
  }
`
const ButtonPhone = styled.div``
const ButtonCall = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`
const Button = styled(Link)`
  width: 70%;
  height: 50px;
  font-size: 2rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #31d68b;
  border-radius: 50px;
  box-shadow: 0 4px 4px 0 rgb(0 0 0 / 20%);
  cursor: pointer;
`

const API_Phone = [1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"]
const Call = (prop) => {
  const [number, setNumber] = useState("")
  const dispatch = useDispatch()

  const handleAddPhoneNumber = (value) => {
    setNumber(number + value)
  }
  const handleDeletePhoneNumber = () => {
    setNumber(number.slice(0, -1))
  }

  //call phone
  const handleCallPhone = (number) => {
    prop.call(number)
    dispatch(setProduct(number))
  }

  return (
    <Container>
      <NumberPhone>
        <Input value={number} onChange={() => setNumber(number)} />
        <DeletePhone onClick={handleDeletePhoneNumber}>
          <FontAwesomeIcon icon={faDeleteLeft} />
        </DeletePhone>
      </NumberPhone>
      <MenuPhone>
        {API_Phone.map((item) => (
          <ItemPhone key={item}>
            <ButtonPhone onClick={() => handleAddPhoneNumber(item)}>
              {item}
            </ButtonPhone>
          </ItemPhone>
        ))}
      </MenuPhone>
      <ButtonCall>
        <Button to="/ringing" onClick={() => handleCallPhone(number)}>
          <FontAwesomeIcon icon={faPhone} />
        </Button>
      </ButtonCall>
    </Container>
  )
}

export default Call
