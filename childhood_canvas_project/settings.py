from pathlib import Path
import os # this is important!!

# DEPLOYMENT CHANGE #1 / X : Disable below for Heroku, enable for local + PythonAnywhere
# from . secrets import * # has new secret key

# DEPLOYMENT CHANGE #2 / X : see section "import django_on_heroku" at END

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECRET_KEY = 'd4lfp((w_un^az#s7n9qq4qr5t_z$e@l^4h+fb4q*o$w78%q3s' # OLD, committed by accident                            # SECURE THIS FOR PRODUCTION! -- IF IT WAS ACCIDENTALLY PUSHED, CREATE A NEW ONE!
# In Deployed Heroku, secret key is set in the environment_variables (via CLI or config page)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True            # DIS-ABLE THIS FOR PRODUCTION
                        # ALSO ENABLE FOR PRODUCTION @ VERY BOTTOM OF FILE: CSRF_COOKIE_SECURE & SESSION_COOKIE_SECURE
ALLOWED_HOSTS = [
    "johnfial.pythonanywhere.com",
                        # When DEBUG is True and ALLOWED_HOSTS is empty, the host is validated against :
    '.localhost',                                                                                                           # DIS-ABLE THIS FOR PRODUCTION
    '127.0.0.1',                                                                                                            # DIS-ABLE THIS FOR PRODUCTION
    ]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'accounts', # see https://learndjango.com/tutorials/django-custom-user-model
    'canvas_app.apps.CanvasAppConfig', # my app
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'childhood_canvas_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [str(BASE_DIR.joinpath('templates'))], # adds /templates
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'childhood_canvas_project.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',

        # Original:
        # 'NAME': BASE_DIR / 'db.sqlite3',

        # New From: https://stackoverflow.com/questions/64634674/django-typeerror-argument-of-type-posixpath-is-not-iterable
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/3.1/howto/static-files/
    # https://stackoverflow.com/questions/27886477/invalid-block-tag-static

    # DON'T FORGET TO CHANGE ABOVE:
    # TEMPLATES  = [    { 
    #       ...
    #       'DIRS': [ BASE_DIR / 'templates' ], 
    #       ... } ]

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

AUTH_USER_MODEL = 'accounts.CustomUser'
LOGIN_REDIRECT_URL = 'home'
LOGOUT_REDIRECT_URL = 'home'

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# DEPLOYMENT NOTES:

# manage.py check --deploy

# Consider: enabling cached template loader...
# https://docs.djangoproject.com/en/2.2/ref/templates/api/#template-loaders
# https://docs.djangoproject.com/en/2.2/ref/settings/#std:setting-TEMPLATES

# "If you haven’t set up backups for your database, do it right now!"
# "Now is a good time to check your backup strategy for *MEDIA_ROOT and MEDIA_URL¶* files."

# from https://stackoverflow.com/questions/48913016/django-the-staticfiles-dirs-setting-should-not-contain-the-static-root-setting 
# regarding a search for PythonAnywhere error: 'The STATICFILES_DIRS setting should not contain the STATIC_ROOT setting.'
# (seems to be a non-serious debug warning only...)
STATIC_URL = '/static/'
# STATIC_ROOT = '/home/johnfial/johnfial.pythonanywhere.com/static/' # Deployed site!
# STATICFILES_DIRS = [ BASE_DIR / 'static' ]                                                                                  # EXPERIMENTING: ENABLE THIS FOR DEPLOYED PRODUCTION when dis-abling DEBUG=TRUE
if not DEBUG:                                                                                                                 # EXPERIMENTING: DISABLE THESE 4 LINES FOR FOR DEPLOYED PRODUCTION when dis-abling DEBUG=TRUE
    STATIC_ROOT = ''                                                                                                          # EXPERIMENTING: DISABLE THESE 4 LINES FOR FOR DEPLOYED PRODUCTION when dis-abling DEBUG=TRUE
STATICFILES_DIRS = [                                                                                                          # EXPERIMENTING: DISABLE THESE 4 LINES FOR FOR DEPLOYED PRODUCTION when dis-abling DEBUG=TRUE
    os.path.join(BASE_DIR, 'static/'),                                                                                        # EXPERIMENTING: DISABLE THESE 4 LINES FOR FOR DEPLOYED PRODUCTION when dis-abling DEBUG=TRUE
]                                                                                                                             # EXPERIMENTING: DISABLE THESE 4 LINES FOR FOR DEPLOYED PRODUCTION when dis-abling DEBUG=TRUE

# https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/ :
# CSRF_COOKIE_SECURE = True # default False                                                                                  # ENABLE THIS FOR DEPLOYED PRODUCTION
# SESSION_COOKIE_SECURE = True # # default False                                                                             # ENABLE THIS FOR DEPLOYED PRODUCTION
# SECURE_SSL_REDIRECT = True # # default False                                                                               # ENABLE THIS FOR DEPLOYED PRODUCTION # https://docs.djangoproject.com/en/3.1/ref/settings/#secure-ssl-redirect

# WARNING ! WARNING ! WARNING ! WARNING ! WARNING ! WARNING ! WARNING ! 
# Setting *THESE THREE* incorrectly can irreversibly break your site. 
# Read the HTTP Strict Transport Security documentation first. 
# @ https://docs.djangoproject.com/en/3.1/ref/middleware/#http-strict-transport-security
# Documentation for all three @ https://docs.djangoproject.com/en/3.1/ref/settings/#std:setting-SECURE_HSTS_INCLUDE_SUBDOMAINS

# SECURE_HSTS_INCLUDE_SUBDOMAINS = True # default False
# SECURE_HSTS_PRELOAD = True # default False

# SECURE_HSTS_SECONDS = 360 # (360 = 6 minutes, 3600 = 1 hour, 31536000 = 1 year ) # 0 default, 
    # Guidance on above seconds setting: 
    # "When enabling HSTS, it’s a good idea to first use a small value for testing, 
    # for example, SECURE_HSTS_SECONDS = 3600 for one hour. Each time a Web browser sees the HSTS header 
    # from your site, it will refuse to communicate non-securely (using HTTP) with your domain 
    # for the given period of time. Once you confirm that all assets are served securely on your site 
    # (i.e. HSTS didn’t break anything), it’s a good idea to increase this value 
    # so that infrequent visitors will be protected (31536000 seconds, i.e. 1 year, is common).""


# https://github.com/PdxCodeGuild/class_salmon/blob/main/5%20Capstone/Heroku%20Deployment.md
# DEPLOYMENT CHANGE #2 / X : Enable below for Heroku, disable for local + PythonAnywhere
import django_on_heroku
django_on_heroku.settings(locals())

"""
Django settings for childhood_canvas_project project.

Generated by 'django-admin startproject' using Django 3.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""