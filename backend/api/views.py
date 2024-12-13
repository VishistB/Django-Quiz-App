from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Question
from rest_framework import status
import random

class QuestionInsertView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = request.data
            for question_data in data:
                Question.objects.create(
                    text=question_data['text'],
                    option_a=question_data['option_a'],
                    option_b=question_data['option_b'],
                    option_c=question_data['option_c'],
                    option_d=question_data['option_d'],
                    correct_option=question_data['correct_option']
                )
            return Response({"message": "Questions inserted successfully."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class GetQuestionsView(APIView):
    def get(self, request, *args, **kwargs):
        all_questions = list(Question.objects.all())
        
        random_questions = random.sample(all_questions, min(10, len(all_questions)))
        
        data = [
            {
                "text": question.text,
                "option_a": question.option_a,
                "option_b": question.option_b,
                "option_c": question.option_c,
                "option_d": question.option_d,
                "correct_option": question.correct_option,
            }
            for question in random_questions
        ]
        return Response(data)
