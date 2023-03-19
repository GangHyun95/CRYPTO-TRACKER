import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { HiSun, HiMoon } from "react-icons/hi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 460px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul`
  margin-top: 20px;
`;

const Coin = styled.li`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  box-shadow: rgba(10, 10, 10, 0.1) 0px 0.2rem 0.5rem;
  cursor: pointer;
  a {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 14px;
    transition: all 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Fixed = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 10px;
  top: 30px;
  left: 30px;
  cursor: pointer;
  svg {
    padding: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.textColor};
    box-shadow: rgba(10, 10, 10, 0.1) 0px 2px 2px;
    color: ${(props) => props.theme.bgColor};
  }
  button {
    background: transparent;
    padding: 0;
    border: 0;
    outline: 0;
  }
`;

const Coins = () => {
  const { isLoading, data: coins } = useQuery<ICoin[]>(
    ["allCoins"],
    fetchCoins
  );
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Container>
      <Fixed>
        <button onClick={toggleDarkAtom}>
          {isDark ? <HiSun /> : <HiMoon />}
        </button>
      </Fixed>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>COIN</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins?.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}/chart`} state={coin}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt="img"
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
