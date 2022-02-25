import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import Content from 'src/view/auth/styles/Content';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import Wrapper from 'src/view/auth/styles/Wrapper';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
const schema = yup.object().shape({
email: yupFormSchemas.string(i18n('user.fields.email'), {
required: true,
}),
password: yupFormSchemas.string(
i18n('user.fields.password'),
{
required: true,
},
),
});
function SignupPage() {
const dispatch = useDispatch();
const location = useLocation();
const loading = useSelector(selectors.selectLoading);
const externalErrorMessage = useSelector(
selectors.selectErrorMessage,
);
const emailFromInvitation = queryString.parse(
location.search,
).email;
const backgroundImageUrl = useSelector(
selectors.selectBackgroundImageUrl,
);
const logoUrl = useSelector(selectors.selectLogoUrl);
useEffect(() => {
dispatch(actions.doClearErrorMessage());
}, [dispatch]);
const [initialValues] = useState({
email: emailFromInvitation || '',
password: '',
});
const form = useForm({
resolver: yupResolver(schema),
mode: 'onSubmit',
defaultValues: initialValues,
});
const onSubmit = ({ email, password }) => {
dispatch(
actions.doRegisterEmailAndPassword(email, password),
);
};
return (

<Wrapper className="main signin"
style={{
backgroundImage: `url(${backgroundImageUrl || '/images/signin-3.svg'
})`,
}}
>
<Content className="auth-page">
<main className="main" id="main">
   <div className="container-fluid" style={{overflow: "hidden"}}>
      <div className="min-vh-100 row" style={{backgroundColor: "var(--algocloud-modal-content-bg) "}}>
         <div className="d-none d-lg-block col-6" style={{backgroundColor: "var(--algocloud-body-bg)", boxShadow: "0 0 0 1px var(--card-border)"}}>
         </div>
         <div className="px-sm-0 align-self-center mx-auto py-0 col-sm-10 col-md-6">
            <div className="justify-content-center no-gutters row">
               <div className="col-xxl-6 col-lg-9 col-xl-8">
               <div className="card-2">
      <div className="card-header text-center p-2">
         <Logo style={{ marginBottom: '1rem', marginTop: '1rem' }}>
         {logoUrl ? (
         <img
            src={logoUrl("/assets/brand-assets/logo.svg")}
            width="240px"
            alt={i18n('app.title')}
            />
         ) : (
         <img style={{width: "60px"}} src="/assets/brand-assets/logo.svg" />
         )}
         </Logo>
      </div>
      <div className="card-body p-4">
         <div className="row flex-between-center mb-3">
            <div className="col-auto">
               <h3>Signup</h3>
            </div>
         </div>
         <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <InputFormItem
                     name="email"
                     placeholder={i18n('user.fields.email')}
                     autoComplete="email"
                     autoFocus
                     externalErrorMessage={externalErrorMessage}
                     />
               </div>
               <div className="mb-3">
                  <label className="form-label" >Password</label>
                  <InputFormItem 
                     name="password"
                     placeholder={i18n('user.fields.password')}
                     autoComplete="password"
                     type="password"
                     className='crayons-textfield'
                     />
               </div>
               <div className="mb-3">
                  <button
                     className="btn btn-primary btn-block w-100 mt-3 crayons-btn"
                     type="submit"
                     disabled={loading}
                     >
                     <ButtonIcon loading={loading} />
                     {' '}
                     {i18n('auth.signup')}
                  </button>
               </div>
               <OtherActions>
                  <Link
                     className="btn btn-sm btn-link"
                     to="/auth/signin"
                     >
                  {i18n('auth.alreadyHaveAnAccount')}
                  </Link>
               </OtherActions>
            </form>
         </FormProvider>
      </div>
   </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</main>

</Content>
</Wrapper>
);
}
export default SignupPage; 