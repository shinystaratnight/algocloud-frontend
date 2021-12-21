export const IncreaseIcon = () => (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.76837 10.8481L0.65918 9.73896L7.9902 2.42527H3.43214V0.848145H10.6592V8.07518H9.08206V3.55178L1.76837 10.8481Z" fill="#0EBC73"></path></svg>
);

export const DecreaseIcon = () => (
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.10919 0.848145L0 1.95733L7.33102 9.27102H2.77296V10.8481H10V3.62111H8.42288V8.1445L1.10919 0.848145Z" fill="#F54822"></path></svg>
);

export const getIconURL = (symbol) => `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`;

export const SymbolIcon = ({name}) => {
    return <img src={getIconURL(name)} alt={name} style={{width: '24px', height: '24px'}}/>
}