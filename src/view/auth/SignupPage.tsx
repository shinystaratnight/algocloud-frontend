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
import 'src/app.css';

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
      <div className="center-container-2">
        <a href="/" className="logo nuxt-link-active" ><img src="/_nuxt/img/logo-purple.cb95760.svg" alt="" data-v-80e842dc="" /></a>
        <div className="login" data-v-9f658a16="" data-v-80e842dc=""><span className="subtitle" >AlgoCloud Dashboard</span> <h1 className="title">Sign in to your Cloud Account</h1>
          <div className="container-2" ><p>
            A comprehensive Analytics and DeFi POS platform on the Algorand blockchain. Customizable, extendable, and 100% powered by the $HDL token.
            <a href="https://twitter.com/headline_crypto"> Learn More</a></p>
            <p className="note" >
              Don't have an account?
              <a href="/auth/signup" className=""> Register for Free</a>. Must hold min. 500 HDL tokens to access AlgoCloud.</p>
          </div>
        </div>
      </div>
      <Content className="">
        <div className="card">
          <div className="card-header bg-circle-shape bg-shape text-center p-2">
            <Logo style={{ marginBottom: '1rem', marginTop: '1rem' }}>
              {logoUrl ? (
                <img
                  src={logoUrl}
                  width="240px"
                  alt={i18n('app.title')}
                />
              ) : (
                <h1 className="algocloud-brand-login">{i18n('app.title')}</h1>
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
                <div className="mb-3"><label className="form-label">Email address</label>
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
                  />
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-primary btn-block w-100 mt-3"
                    type="submit"
                    disabled={loading}
                  >
                    <ButtonIcon loading={loading} />{' '}
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
      </Content>
    </Wrapper>
  );
}

export default SignupPage;
