
from django.urls import path,include
from users.views import RegisterAPI

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('register/',RegisterAPI.as_view()),
]
