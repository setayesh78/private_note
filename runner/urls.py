from django.urls import path

import runner.views

urlpatterns = [
    path('note/', runner.views.Note.as_view()),
    path('note/add/', runner.views.AddNote.as_view()),
    path('note/get/<int:url>', runner.views.GetNote.as_view()),
    path('note/delete/<int:url>', runner.views.SeeNote.as_view()),
]
