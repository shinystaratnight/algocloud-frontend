import styled from "styled-components";

export const ChartWindowWrapper = styled.div`
  margin-top: 16px;
  padding: 24px;
  background: #1e2d58; 
  background: rgba(255,255,255,.05); 
  box-shadow: 0 0 50px 14px rgb(18 28 53 / 3%); 
  border: 1px solid;
  border-color: var(--border-var) !important;
  width: 100%;
  border-radius: 5px;
  position: relative;
`;

export const ChartWrapper = styled.div`
  height: 100%;
  min-height: 300px;

  @media screen and (max-width: 600px) {
    min-height: 200px;
  }
`;

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

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.column ? 'column' : 'row'};
  align-items: center;
  gap: ${(props) => props.gap ? props.gap : '5px'};
`;

export const OptionButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  zIndex: 10;
  right: ${(props) => props.right ? props.right : 'auto'};
  left: ${(props) => props.left ? props.left : 'auto'};
`;

export const OptionButtonContainer = styled.div`
  display: flex;
`;

export const OptionButton = styled.div`
  font-weight: 500;
  width: fit-content;
  white-space: nowrap;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #44c4e2;
  cursor: pointer;
  margin-left: 10px;
  width: ${(props) => props.width ? props.width : 'auto'};
  background-color: #1D294F;
  text-align: center;
`;

export const AssetIndicator = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PoolIndicator = styled.div`
  width: 30%;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  color: ${({ theme }) => theme.text1}
  border-radius: 3px;
  height: 16px;
  width: 16px;
  padding: 0px;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const GraphWrapper = styled.div`
  position: relative;
  padding-top: ${(props) => props.pt ? props.pt : '58px'};
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  padding: 0;
  align-items: center;
  align-items: ${({ align }) => align && align};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  justify-content: ${({ justify }) => justify};
`;

export const RowBetween = styled(Row)`
  justify-content: space-between;
`;

export const FlexColumn = styled.div`
  flex: 1;
`;

export const AlgoexplorerSection = styled.div`
  margin-top: 10px;
  color: #8be1ea;
  font-size: 12px;

  a {
    color: white;
    margin-left: 6px;
  }
`;

