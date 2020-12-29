from django.db import models

# accounts_app models.py for custom user models, see https://learndjango.com/tutorials/django-custom-user-model

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    pass
    # extra stuff here

    def __str__(self):
        return self.username


