


# THIS IS THE APP **accounts** URLS.PY FILE

from django.urls import path
from .views import SignUpView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
]

