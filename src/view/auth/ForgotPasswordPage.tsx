import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import Content from 'src/view/auth/styles/Content';
import Wrapper from 'src/view/auth/styles/Wrapper';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n('user.fields.email'), {
    required: true,
    max: 255,
  }),
});

function ForgotPasswordPage() {
  const dispatch = useDispatch();

  const loading = useSelector(
    selectors.selectLoadingPasswordResetEmail,
  );

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  const [initialValues] = useState(() => ({ email: '' }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = async ({ email }) => {
    await dispatch(actions.doSendPasswordResetEmail(email));
    Object.keys(initialValues).forEach((key: any) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${
          backgroundImageUrl || '/images/forgotPassword.jpg'
        })`,
      }}
    >
      <Content>
        <Logo>
          {logoUrl ? (
            <img
              src={logoUrl}
              width="240px"
              alt={i18n('app.title')}
            />
          ) : (
            <h1>{i18n('app.title')}</h1>
          )}
        </Logo>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputFormItem
              name={'email'}
              label={i18n('user.fields.email')}
              autoComplete={'email'}
              disabled={loading}
              autoFocus
            />

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              <ButtonIcon loading={loading} />{' '}
              {i18n('auth.passwordResetEmail.message')}
            </button>

            <OtherActions>
              <Link
                className="btn btn-sm btn-link"
                to="/auth/signin"
              >
                {i18n('common.cancel')}
              </Link>
            </OtherActions>
          </form>
        </FormProvider>
      </Content>
    </Wrapper>
  );
}

export default ForgotPasswordPage;
