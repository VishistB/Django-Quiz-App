from django.urls import path
from . import views

urlpatterns = [
    path('insert-questions/', views.QuestionInsertView.as_view(), name='insert_questions'),
    path('get-questions/', views.GetQuestionsView.as_view(), name='get_questions'),
]
