from django.urls import path
from . import views

urlpatterns = [
    path('', views.reg_view, name='reg_view'),
]