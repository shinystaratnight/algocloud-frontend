import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import Content from 'src/view/auth/styles/Content';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import Wrapper from 'src/view/auth/styles/Wrapper';
import I18nFlags from 'src/view/layout/I18nFlags';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SocialButtons from 'src/view/auth/styles/SocialButtons';
import config from 'src/config';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Message from 'src/view/shared/message';
import BackgroundVideo from 'src/components/BackgroundVideo/BackgroundVideo';
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
  rememberMe: yupFormSchemas.boolean(
    i18n('user.fields.rememberMe'),
  ),
});

const videoSource = "/assets/video.mp4";
function SigninPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading);

  const { socialErrorCode } = queryString.parse(
    location.search,
  );

  const externalErrorMessage = useSelector(
    selectors.selectErrorMessage,
  );

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  useEffect(() => {
    if (socialErrorCode) {
      if (socialErrorCode === 'generic') {
        Message.error(i18n('errors.defaultErrorMessage'));
      } else {
        Message.error(
          i18n(`auth.social.errors.${socialErrorCode}`),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [initialValues] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(
      actions.doSigninWithEmailAndPassword(
        email,
        password,
        rememberMe,
      ),
    );
  };

  return (
    <Wrapper className="screenshot" >      
      <BackgroundVideo
        blur={0}
        videoSource={videoSource} >
      </BackgroundVideo>
      <Content className="screenshot-2">
             <Logo>
             <a className="screenshot-navbar-brand" href="."><h1 className="logo-font"><strong>Algo</strong>Cloud</h1><svg className="svg-logo" xmlns="http://www.w3.org/2000/svg" width="50" height="48" fill="currentColor" viewBox="0 0 16 16">
  <path d="M8.5 4a4.002 4.002 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 13H.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 4zM0 8.5A.5.5 0 0 1 .5 8h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"></path>
</svg></a>
          {logoUrl ? (
            <img
              src={logoUrl}
              width="240px"
              alt={i18n('app.title')}
            />
          ) : (
            <h1></h1>
          )}
        </Logo>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputFormItem
              name="email"
              placeholder={i18n('user.fields.email')}
              autoComplete="email"
              autoFocus
              externalErrorMessage={externalErrorMessage}
            />
            <InputFormItem
              name="password"
              placeholder={i18n('user.fields.password')}
              autoComplete="password"
              type="password"
            />

            <div className="d-flex form-group">
              <div className="screenshot-checkbox-box col-6">
                <input
                  className="screenshot-checkbox"
                  type="checkbox"
                  id={'rememberMe'}
                  name={'rememberMe'}
                  ref={form.register}
                />

                <label
                  className="screenshot-checkbox-label"
                  htmlFor={'rememberMe'}
                >
                  {i18n('user.fields.rememberMe')}
                </label>
              </div>

              <div className="col-6 pr-0">
                <Link
                  className="btn btn-sm btn-link"
                  style={{ float: 'right' }}
                  to="/auth/forgot-password"
                >
                  {i18n('auth.forgotPassword')}
                </Link>
              </div>
            </div>

            <button
              className="screenshot-btn btn btn-primary btn-block"
              type="submit"
              disabled={loading}
            >
              <ButtonIcon loading={loading} />{' '}
              {i18n('auth.signin')}
            </button>

            <SocialButtons>
              <a
                href={`${config.backendUrl}/auth/social/facebook`}
              >
                <i
                  className="fab fa-facebook"
                  style={{
                    color: '#3B5998',
                  }}
                />
              </a>

              <a
                href={`${config.backendUrl}/auth/social/google`}
              >
                <i
                  className="fab fa-google"
                  style={{
                    color: '#DB4437',
                  }}
                />
              </a>
            </SocialButtons>

            <OtherActions>
              <Link
                className="btn btn-sm btn-link"
                to="/auth/signup"
              >
                {i18n('auth.createAnAccount')}
              </Link>
            </OtherActions>

          </form>
          <div className="built-by">
            <div className="built-by-flags"><I18nFlags className="built-by-flags"/></div>
  <h2>Built by HEADLINE</h2><p className="copyright">© 2021 HEADLINE INC. All rights reserved.</p></div>
        </FormProvider>
      </Content>
    </Wrapper>
    
  );
}

export default SigninPage;
