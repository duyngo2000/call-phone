import React, { useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPhone,
  faMicrophone,
  faMicrophoneSlash,
  faGrip,
  faPause,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

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

const Info = styled.div`
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  color: #fff;
`
const Name = styled.div`
  font-size: 1.7rem;
  font-weight: 400;
`
const PhoneNumber = styled.div`
  font-size: 1.2rem;
`
const Cty = styled.div`
  font-size: 1.1rem;
`
const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`
const Menu = styled.div``
const Item = styled.div`
  font-size: 1.2rem;
`
const Feature = styled.div`
  padding: 0 40px;
`
const MenuFeature = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ItemFeature = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  cursor: pointer;
`
const Icon = styled(FontAwesomeIcon)`
  display: ${({ show }) => (show ? "block" : "none")};
  border: 1px solid #ccc;
  border-radius: 50%;
  color: #ccc;
  padding: 15px;
  width: 20px;
  height: 20px;
`
const style = {
  border: "1px solid #ccc",
  borderRadius: "50%",
  color: "#ccc",
  padding: "15px",
  width: "20px",
  height: "20px",
}
const NameFeature = styled.p``

const ButtonCall = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`
const Button = styled(Link)`
  width: 50%;
  height: 50px;
  font-size: 2rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e91e63;
  border-radius: 50px;
  box-shadow: 0 4px 4px 0 rgb(0 0 0 / 20%);
  cursor: pointer;
`

const Ringing = (prop) => {
  const [showMute, setShowMute] = useState(false)
  const number = useSelector((state) => state.allProducts.products)

  const handleClickMuteTrue = () => {
    setShowMute(!showMute)
    prop.changeMute(true)
  }
  const handleClickMuteFalse = () => {
    setShowMute(!showMute)
    prop.changeMute(false)
  }

  return (
    <Container>
      <Info>
        <Name>No name</Name>
        <PhoneNumber>{number}</PhoneNumber>
        <Cty>Gcalls</Cty>
      </Info>
      <Status>
        <Menu>
          <Item>Đang gọi...</Item>
          {/* <Item>Máy bận</Item> */}
          {/* <Item>Không liên lạc dc</Item> */}
        </Menu>
      </Status>
      <Feature>
        <MenuFeature>
          <ItemFeature>
            <Icon
              show={!showMute}
              icon={faMicrophone}
              onClick={handleClickMuteTrue}
            />
            <Icon
              show={showMute}
              icon={faMicrophoneSlash}
              onClick={handleClickMuteFalse}
            />
            <NameFeature>mute</NameFeature>
          </ItemFeature>
          <ItemFeature>
            <FontAwesomeIcon style={style} icon={faGrip} />
            <NameFeature>keypad</NameFeature>
          </ItemFeature>
          <ItemFeature>
            <FontAwesomeIcon style={style} icon={faPause} />
            <NameFeature>pause</NameFeature>
          </ItemFeature>
          <ItemFeature>
            <FontAwesomeIcon style={style} icon={faPhoneVolume} />
            <NameFeature>forward</NameFeature>
          </ItemFeature>
        </MenuFeature>
      </Feature>
      <ButtonCall>
        <Button to="/call" onClick={() => prop.callStop()}>
          <FontAwesomeIcon
            icon={faPhone}
            style={{ transform: "rotate(135deg)" }}
          />
        </Button>
      </ButtonCall>
    </Container>
  )
}

export default Ringing
