import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

interface IPriceProps {
  percent15m: number;
  percent30m: number;
  percent1h: number;
  percent6h: number;
  percent12h: number;
  percent7d: number;
  percent30d: number;
  percent1y: number;
}

const Container = styled.section`
  display: grid;
  justify-items: center;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`;

const Box = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
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
      {percentList.map((item) => (
        <Box>
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
