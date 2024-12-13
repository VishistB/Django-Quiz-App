# admin.py
from django.contrib import admin
from .models import Question

# Simple registration
admin.site.register(Question)
