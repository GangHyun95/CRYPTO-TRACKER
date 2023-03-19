import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const Container = styled.section`
  display: grid;
  justify-items: center;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`;

const Box = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  box-shadow: rgba(10, 10, 10, 0.1) 0px 0.2rem 0.5rem;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 18px;
  display: block;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  text-align: center;
`;

const PercentBox = styled.div<{ percent: number | undefined }>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: ${(props) =>
    props.percent
      ? props.percent > 0
        ? "#DA5157"
        : props.percent < 0
        ? "#4880EE"
        : "#fff"
      : "none"};
`;

const Percent = styled.span`
  font-size: 35px;
  font-weight: 600;
`;

interface IPriceProps {
  [key: string]: number;
}

export default function Price() {
  const {
    percent15m,
    percent30m,
    percent1h,
    percent6h,
    percent12h,
    percent7d,
    percent30d,
    percent1y,
  } = useOutletContext<IPriceProps>();
  const percentList = [
    { time: "15 minutes", percent: percent15m },
    { time: "30 minutes", percent: percent30m },
    { time: "1 hour", percent: percent1h },
    { time: "6 hour", percent: percent6h },
    { time: "12 hour", percent: percent12h },
    { time: "7 days", percent: percent7d },
    { time: "30 days", percent: percent30d },
    { time: "1 year", percent: percent1y },
  ];
  return (
    <Container>
      {percentList.map((item, idx) => (
        <Box key={idx}>
          <Title>{item.time} ago</Title>
          <PercentBox percent={item.percent}>
            <Percent>
              {item.percent && item.percent > 0
                ? `+${item.percent}%`
                : `${item.percent}%`}
            </Percent>
          </PercentBox>
        </Box>
      ))}
    </Container>
  );
}
