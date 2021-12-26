import styled from "styled-components";
import { Link } from 'react-router-dom';

export const SectionTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 2rem;
`;

export const SectionTitle = styled.h5`
  color: white;
  margin-bottom: 10px;
  a {
    color: white;
  }
`;

export const StyledTokenView = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    img {
        width: 24px;
        height: 24px;
    }
    .info {
        p {
            margin: 0;
        }
        .name {
            font-size: 15px;
            font-weight: 600;
        }
        .unit {
            font-size: 12px;
        }
    }
`;

export const StyledPairView = styled(Link)`
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
    img {
        width: 24px;
        height: 24px;
    }
`;

export const StyledPriceChangeView = styled.div`
    &.increase {
        color: #6dfabf;
    }
    &.decrease {
        color: #ff6033;
    }
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const StyledAmountView = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    img {
        width: 24px;
        height: 24px;
    }
`;

export const StyledStatCard = styled.div`
    p {
       margin-bottom: 0; 
    }
    .name {
        font-size: 15px;
        margin-bottom: 10px;
    }
    .value {
        font-size: 20px;
    }
`;

export const StyledCardWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    @media screen and (max-width: 800px) {
        flex-direction: column;
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: ${(props) => props.column ? 'column' : 'row'};
    align-items: center;
    gap: ${(props) => props.gap ? props.gap : '5px'};
`;